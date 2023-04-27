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
import { CreateHeroeDTO, ObjectDTO, PowerDTO } from './types/dto'
import { CreateHeroeResponse } from './types/response'
import { HeroeRepository } from '../../repositories/heroe.repository'
import { PersonNotFoundError } from 'src/civil/application/exceptions/person.not.found'
import { ObjectId } from 'src/heroe/domain/entities/object/value-objects/object.id'
import { PowerId } from 'src/heroe/domain/entities/power/value-objects/power.id'
import { ObjectItem } from 'src/heroe/domain/entities/object/object'
import { ObjectName } from 'src/heroe/domain/entities/object/value-objects/object.name'
import { ObjectDescription } from 'src/heroe/domain/entities/object/value-objects/object.description'
import { ObjectKind } from 'src/heroe/domain/entities/object/value-objects/object.kind'
import { ObjectMaterial } from 'src/heroe/domain/entities/object/value-objects/object.material'
import { ObjectCreator } from 'src/heroe/domain/entities/object/value-objects/object.creator'
import { Power } from 'src/heroe/domain/entities/power/power'
import { PowerName } from 'src/heroe/domain/entities/power/value-objects/power.name'
import { PowerDescription } from 'src/heroe/domain/entities/power/value-objects/power.description'
import { PowerType } from 'src/heroe/domain/entities/power/value-objects/power.type'
import { Heroe } from 'src/heroe/domain/heroe'
import { HeroeId } from 'src/heroe/domain/value-object/heroe.id'
import { HeroeName } from 'src/heroe/domain/value-object/name'
import { HeroePhrase } from 'src/heroe/domain/value-object/phrase'
import { HeroeCreator } from 'src/heroe/domain/value-object/creator'
import { ArchEnemy } from 'src/heroe/domain/value-object/arch.enemy'

export class CreateHeroeCommand implements ApplicationService<CreateHeroeDTO, CreateHeroeResponse, ApplicationError> {
    constructor(
        private readonly heroeRepository: HeroeRepository,
        private readonly uuidGenerator: UUIDGenerator,
        private readonly eventHandler: EventHandler,
    ) {}

    private createPersonByDTO(dto: CreateHeroeDTO): Person {
        return new Person(
            new PersonId(this.uuidGenerator.generate()),
            new PersonName(dto.person!.name, dto.person!.lastName),
            new PersonGender(dto.person!.gender),
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
        return new Power(new PowerId(this.uuidGenerator.generate()), new PowerName(dto.name), new PowerDescription(dto.description), new PowerType(dto.type))
    }

    async execute(data: CreateHeroeDTO): Promise<Result<CreateHeroeResponse, ApplicationError>> {
        const person = data.personId ? await this.heroeRepository.getPersonById(new PersonId(data.personId!)) : this.createPersonByDTO(data)
        if (!person) return Result.error(new PersonNotFoundError())
        const objectsDb = await data.objectsId.asyncMap(async (e) => {
            const object = await this.heroeRepository.getObjectById(new ObjectId(e))
            if (!object) throw new Error('Object not found')
            return object
        })
        const objectsPrimitive: ObjectItem[] = data.objects.map(this.createObjectByDTO.bind(this))
        const powersDb = await data.powersId.asyncMap(async (e) => {
            const power = await this.heroeRepository.getPowerById(new PowerId(e))
            if (!power) throw new Error('Power not found')
            return power
        })
        const powersPrimitive: Power[] = data.powers.map(this.createPowerByDTO.bind(this))
        const heroe = new Heroe(
            new HeroeId(this.uuidGenerator.generate()),
            new HeroeName(data.name),
            person,
            new HeroePhrase(data.phrase),
            new HeroeCreator(data.creator.firstName, data.creator.lastName),
            new ArchEnemy(data.archEnemy),
            [...powersDb, ...powersPrimitive],
            [...objectsDb, ...objectsPrimitive],
        )
        await this.heroeRepository.save(heroe)
        this.eventHandler.publish(heroe.pullEvents())
        return Result.success({
            id: heroe.id.value,
        })
    }
}
