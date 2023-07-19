import { ApplicationService } from 'src/core/application/service/application.service'
import { ApplicationError } from 'src/core/application/error/application.error'
import { UUIDGenerator } from 'src/core/application/UUID/UUID.generator'
import { EventHandler } from 'src/core/application/event-handler/event.handler'
import { Result } from 'src/core/application/result-handler/result.handler'
import { PersonName } from 'src/heroe/domain/entities/person/value-objects/name'
import { PersonGender } from 'src/heroe/domain/entities/person/value-objects/gender'
import { MaritialStatus } from 'src/heroe/domain/entities/person/value-objects/maritial.status'
import { PersonEye } from 'src/heroe/domain/entities/person/value-objects/eyes'
import { ModifyHeroeDTO, ObjectDTO, PowerDTO } from './types/dto'
import { HeroeRepository } from '../../repositories/heroe.repository'
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
import { HeroeId } from 'src/heroe/domain/value-object/heroe.id'
import { HeroeName } from 'src/heroe/domain/value-object/name'
import { ArchEnemy } from 'src/heroe/domain/value-object/arch.enemy'
import { Phrase } from 'src/heroe/domain/entities/person/value-objects/phrase'
import { CreateHeroeResponse } from '../create/types/response'
import { HeroeNotFoundError } from '../../errors/heroe.not.found'

export class ModifyHeroeCommand
    implements
        ApplicationService<
            ModifyHeroeDTO,
            CreateHeroeResponse,
            ApplicationError
        >
{
    constructor(
        private readonly heroeRepository: HeroeRepository,
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
        data: ModifyHeroeDTO,
    ): Promise<Result<CreateHeroeResponse, ApplicationError>> {
        const heroe = await this.heroeRepository.getById(new HeroeId(data.id))
        if (!heroe) throw new HeroeNotFoundError()
        if (data.archEnemy) heroe.changeArchEnemy(new ArchEnemy(data.archEnemy))
        if (data.name) heroe.changeName(new HeroeName(data.name))
        if (data.person?.eyesColor) {
            heroe?.changeEyes(new PersonEye(data.person.eyesColor))
        }
        if (data.person?.gender) {
            heroe?.changeGender(new PersonGender(data.person.gender))
        }
        if (data.person?.lastName) {
            heroe?.changePersonName(
                new PersonName(
                    heroe.person.name.firstName,
                    data.person.lastName,
                ),
            )
        }
        if (data.person?.name) {
            heroe?.changePersonName(
                new PersonName(data.person.name, heroe.person.name.lastName),
            )
        }
        if (data.person?.maritialStatus)
            heroe.changeMaritialStatus(
                new MaritialStatus(data.person.maritialStatus),
            )
        if (data.person?.phrase)
            heroe.changePhrase(new Phrase(data.person.phrase))
        const objectsDb = await data.objectsIdToAdd.asyncMap(async (e) => {
            const object = await this.heroeRepository.getObjectById(
                new ObjectId(e),
            )
            if (!object) throw new Error('Object not found')
            return object
        })
        const objectsPrimitive: ObjectItem[] = data.objects.map(
            this.createObjectByDTO.bind(this),
        )
        const powersDb = await data.powersIdToAdd.asyncMap(async (e) => {
            const power = await this.heroeRepository.getPowerById(
                new PowerId(e),
            )
            if (!power) throw new Error('Power not found')
            return power
        })
        const powersPrimitive: Power[] = data.powers.map(
            this.createPowerByDTO.bind(this),
        )
        data.objectsIdToRemove.forEach((e) =>
            heroe.removeObject(new ObjectId(e)),
        )
        data.powersIdToRemove.forEach((e) => heroe.removePower(new PowerId(e)))
        powersDb.forEach((e) => heroe.addPower(e))
        powersPrimitive.forEach((e) => heroe.addPower(e))
        objectsDb.forEach((e) => heroe.addObject(e))
        objectsPrimitive.forEach((e) => heroe.addObject(e))
        await this.heroeRepository.save(heroe)
        this.eventHandler.publish(heroe.pullEvents())
        return Result.success({
            id: heroe.id.value,
        })
    }
}
