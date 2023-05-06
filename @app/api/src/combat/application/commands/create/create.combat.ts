import { ApplicationService } from 'src/core/application/service/application.service'
import { CreateCombatDTO } from './types/dto'
import { CreateCombatReponse } from './types/response'
import { ApplicationError } from 'src/core/application/error/application.error'
import { CombatRepository } from '../../repositories/combat.repository'
import { UUIDGenerator } from 'src/core/application/UUID/UUID.generator'
import { EventHandler } from 'src/core/application/event-handler/event.handler'
import { Result } from 'src/core/application/result-handler/result.handler'
import { Combat } from 'src/combat/domain/combat'
import { CombatId } from 'src/combat/domain/value-objects/id'
import { CombatPlace } from 'src/combat/domain/value-objects/place'
import { CombatDate } from 'src/combat/domain/value-objects/date'
import { Character } from 'src/combat/domain/entities/character/character'
import { CharacterId } from 'src/combat/domain/entities/character/value-objects/id'
import { ObjectId } from 'src/combat/domain/entities/character/value-objects/object'
import { PowerId } from 'src/combat/domain/entities/character/value-objects/power'

export class CreateCombatCommand
    implements
        ApplicationService<
            CreateCombatDTO,
            CreateCombatReponse,
            ApplicationError
        >
{
    constructor(
        private readonly combatRepository: CombatRepository,
        private readonly uuidGenerator: UUIDGenerator,
        private readonly eventHandler: EventHandler,
    ) {}

    async execute(
        data: CreateCombatDTO,
    ): Promise<Result<CreateCombatReponse, ApplicationError>> {
        const combat = new Combat(
            new CombatId(this.uuidGenerator.generate()),
            new CombatPlace(data.place),
            new CombatDate(data.date),
            data.characters.map(
                (e) =>
                    new Character(
                        new CharacterId(e.id),
                        e.objects.map((object) => new ObjectId(object)),
                        e.powers.map((power) => new PowerId(power)),
                    ),
            ),
        )
        await this.combatRepository.save(combat)
        this.eventHandler.publish(combat.pullEvents())
        return Result.success({
            id: combat.id.value,
        })
    }
}
