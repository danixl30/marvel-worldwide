import { ApplicationService } from 'src/core/application/service/application.service'
import { ApplicationError } from 'src/core/application/error/application.error'
import { UUIDGenerator } from 'src/core/application/UUID/UUID.generator'
import { EventHandler } from 'src/core/application/event-handler/event.handler'
import { Result } from 'src/core/application/result-handler/result.handler'
import { Person } from 'src/heroe/domain/entities/person/person'
import { PersonId } from 'src/heroe/domain/entities/person/value-objects/id'
import { PersonName } from 'src/heroe/domain/entities/person/value-objects/name'
import { PersonGender } from 'src/heroe/domain/entities/person/value-objects/gender'
import { MaritialStatus } from 'src/heroe/domain/entities/person/value-objects/maritial.status'
import { PersonHair } from 'src/heroe/domain/entities/person/value-objects/hair'
import { PersonEye } from 'src/heroe/domain/entities/person/value-objects/eyes'
import { PersonNationality } from 'src/heroe/domain/entities/person/value-objects/nationality'
import { PersonOccupation } from 'src/heroe/domain/entities/person/value-objects/occupation'
import { CreateVillainDTO } from './types/dto'
import { CreateVillainResponse } from './types/response'
import { VillainRepository } from '../../repositories/villain.repository'
import {
    ObjectDTO,
    PowerDTO,
} from 'src/heroe/application/commands/create/types/dto'
import { ObjectItem } from 'src/heroe/domain/entities/object/object'
import { ObjectId } from 'src/heroe/domain/entities/object/value-objects/object.id'
import { ObjectName } from 'src/heroe/domain/entities/object/value-objects/object.name'
import { ObjectDescription } from 'src/heroe/domain/entities/object/value-objects/object.description'
import { ObjectKind } from 'src/heroe/domain/entities/object/value-objects/object.kind'
import { ObjectMaterial } from 'src/heroe/domain/entities/object/value-objects/object.material'
import { ObjectCreator } from 'src/heroe/domain/entities/object/value-objects/object.creator'
import { Power } from 'src/heroe/domain/entities/power/power'
import { PowerId } from 'src/heroe/domain/entities/power/value-objects/power.id'
import { PowerName } from 'src/heroe/domain/entities/power/value-objects/power.name'
import { PowerDescription } from 'src/heroe/domain/entities/power/value-objects/power.description'
import { PowerType } from 'src/heroe/domain/entities/power/value-objects/power.type'
import { PersonNotFoundError } from 'src/civil/application/exceptions/person.not.found'
import { Villain } from 'src/villain/domain/villain'
import { VillainId } from 'src/villain/domain/value-object/villain.id'
import { VillainName } from 'src/villain/domain/value-object/name'
import { VillainObjetive } from 'src/villain/domain/value-object/objetive'
import { Enemy } from 'src/villain/domain/value-object/heroe.enemy'
import { EnemyGroup } from 'src/villain/domain/value-object/heroe.group.enemy'
import { Phrase } from 'src/heroe/domain/entities/person/value-objects/phrase'
import { Logo } from 'src/heroe/domain/value-object/logo'

export class CreateVillainCommand
    implements
        ApplicationService<
            CreateVillainDTO,
            CreateVillainResponse,
            ApplicationError
        >
{
    constructor(
        private readonly villainRepository: VillainRepository,
        private readonly uuidGenerator: UUIDGenerator,
        private readonly eventHandler: EventHandler,
    ) {}

    private createPersonByDTO(dto: CreateVillainDTO): Person {
        return new Person(
            new PersonId(this.uuidGenerator.generate()),
            new PersonName(dto.person!.name, dto.person!.lastName),
            new PersonGender(dto.person!.gender),
            new Phrase(dto.person!.phrase),
            new MaritialStatus(dto.person!.maritialStatus),
            new PersonHair(dto.person!.hairColor),
            new PersonEye(dto.person!.eyesColor),
            dto.person!.occupations.map((e) => new PersonOccupation(e)),
            dto.person!.nationalities.map((e) => new PersonNationality(e)),
        )
    }

    private createObjectByDTO(dto: ObjectDTO): ObjectItem {
        return new ObjectItem(
            new ObjectId(this.uuidGenerator.generate()),
            new ObjectName(dto.name),
            new ObjectDescription(dto.description),
            new ObjectKind(dto.kind),
            new ObjectMaterial(dto.material),
            new ObjectCreator(dto.creator),
        )
    }
    private createPowerByDTO(dto: PowerDTO): Power {
        return new Power(
            new PowerId(this.uuidGenerator.generate()),
            new PowerName(dto.name),
            new PowerDescription(dto.description),
            new PowerType(dto.type),
        )
    }

    async execute(
        data: CreateVillainDTO,
    ): Promise<Result<CreateVillainResponse, ApplicationError>> {
        const person = data.personId
            ? await this.villainRepository.getPersonById(
                  new PersonId(data.personId!),
              )
            : this.createPersonByDTO(data)
        if (!person) return Result.error(new PersonNotFoundError())
        const objectsDb = await data.objectsId.asyncMap(async (e) => {
            const object = await this.villainRepository.getObjectById(
                new ObjectId(e),
            )
            if (!object) throw new Error('Object not found')
            return object
        })
        const objectsPrimitive: ObjectItem[] = data.objects.map(
            this.createObjectByDTO.bind(this),
        )
        const powersDb = await data.powersId.asyncMap(async (e) => {
            const power = await this.villainRepository.getPowerById(
                new PowerId(e),
            )
            if (!power) throw new Error('Power not found')
            return power
        })
        const powersPrimitive: Power[] = data.powers.map(
            this.createPowerByDTO.bind(this),
        )
        const villain = new Villain(
            new VillainId(this.uuidGenerator.generate()),
            new VillainName(data.name),
            person,
            new VillainObjetive(data.objetive),
            new Logo(data.logo),
            data.enemies.map((e) => new Enemy(e)),
            data.enemieGroups.map((e) => new EnemyGroup(e)),
            [...powersDb, ...powersPrimitive],
            [...objectsDb, ...objectsPrimitive],
        )
        await this.villainRepository.save(villain)
        this.eventHandler.publish(villain.pullEvents())
        return Result.success({
            id: villain.id.value,
        })
    }
}
