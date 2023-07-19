import { ApplicationService } from 'src/core/application/service/application.service'
import { ApplicationError } from 'src/core/application/error/application.error'
import { UUIDGenerator } from 'src/core/application/UUID/UUID.generator'
import { EventHandler } from 'src/core/application/event-handler/event.handler'
import { Result } from 'src/core/application/result-handler/result.handler'
import { PersonId } from 'src/heroe/domain/entities/person/value-objects/id'
import { PersonName } from 'src/heroe/domain/entities/person/value-objects/name'
import { PersonGender } from 'src/heroe/domain/entities/person/value-objects/gender'
import { MaritialStatus } from 'src/heroe/domain/entities/person/value-objects/maritial.status'
import { PersonEye } from 'src/heroe/domain/entities/person/value-objects/eyes'
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
import { VillainId } from 'src/villain/domain/value-object/villain.id'
import { VillainName } from 'src/villain/domain/value-object/name'
import { Enemy } from 'src/villain/domain/value-object/heroe.enemy'
import { EnemyGroup } from 'src/villain/domain/value-object/heroe.group.enemy'
import { Phrase } from 'src/heroe/domain/entities/person/value-objects/phrase'
import { ModifyVillainDTO } from './types/dto'
import { CreateVillainResponse } from '../create/types/response'
import { VillainNotFoundError } from '../../errors/villain.not.found'

export class ModifyVillainCommand
    implements
        ApplicationService<
            ModifyVillainDTO,
            CreateVillainResponse,
            ApplicationError
        >
{
    constructor(
        private readonly villainRepository: VillainRepository,
        private readonly uuidGenerator: UUIDGenerator,
        private readonly eventHandler: EventHandler,
    ) {}

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
        data: ModifyVillainDTO,
    ): Promise<Result<CreateVillainResponse, ApplicationError>> {
        const villain = await this.villainRepository.getById(
            new VillainId(data.id),
        )
        if (!villain) throw new VillainNotFoundError()
        if (data.name) villain.changeName(new VillainName(data.name))
        if (data.person?.eyesColor) {
            villain?.changeEyes(new PersonEye(data.person.eyesColor))
        }
        if (data.person?.gender) {
            villain?.changeGender(new PersonGender(data.person.gender))
        }
        if (data.person?.lastName) {
            villain?.changePersonName(
                new PersonName(
                    villain.person.name.firstName,
                    data.person.lastName,
                ),
            )
        }
        if (data.person?.name) {
            villain?.changePersonName(
                new PersonName(data.person.name, villain.person.name.lastName),
            )
        }
        if (data.person?.maritialStatus)
            villain.changeMaritialStatus(
                new MaritialStatus(data.person.maritialStatus),
            )
        if (data.person?.phrase)
            villain.changePhrase(new Phrase(data.person.phrase))
        const objectsDb = await data.objectsIdToAdd.asyncMap(async (e) => {
            const object = await this.villainRepository.getObjectById(
                new ObjectId(e),
            )
            if (!object) throw new Error('Object not found')
            return object
        })
        const objectsPrimitive: ObjectItem[] = data.objects.map(
            this.createObjectByDTO.bind(this),
        )
        const powersDb = await data.powersIdToAdd.asyncMap(async (e) => {
            const power = await this.villainRepository.getPowerById(
                new PowerId(e),
            )
            if (!power) throw new Error('Power not found')
            return power
        })
        const powersPrimitive: Power[] = data.powers.map(
            this.createPowerByDTO.bind(this),
        )
        data.objectsIdToRemove.forEach((e) =>
            villain.removeObject(new ObjectId(e)),
        )
        data.powersIdToRemove.forEach((e) =>
            villain.removePower(new PowerId(e)),
        )
        powersDb.forEach((e) => villain.addPower(e))
        powersPrimitive.forEach((e) => villain.addPower(e))
        objectsDb.forEach((e) => villain.addObject(e))
        objectsPrimitive.forEach((e) => villain.addObject(e))
        data.enemiesToRemove.forEach((e) =>
            villain.removeEnemy(new EnemyGroup(e)),
        )
        data.enemiesToAdd.forEach((e) => villain.addEnemy(new Enemy(e)))
        await this.villainRepository.save(villain)
        this.eventHandler.publish(villain.pullEvents())
        return Result.success({
            id: villain.id.value,
        })
    }
}
