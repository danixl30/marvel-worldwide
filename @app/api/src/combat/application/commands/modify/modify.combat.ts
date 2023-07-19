import { ApplicationService } from 'src/core/application/service/application.service'
import { ApplicationError } from 'src/core/application/error/application.error'
import { CombatRepository } from '../../repositories/combat.repository'
import { UUIDGenerator } from 'src/core/application/UUID/UUID.generator'
import { EventHandler } from 'src/core/application/event-handler/event.handler'
import { Result } from 'src/core/application/result-handler/result.handler'
import { CombatId } from 'src/combat/domain/value-objects/id'
import { CombatPlace } from 'src/combat/domain/value-objects/place'
import { CombatDate } from 'src/combat/domain/value-objects/date'
import { Character } from 'src/combat/domain/entities/character/character'
import { CharacterId } from 'src/combat/domain/entities/character/value-objects/id'
import { ObjectId } from 'src/combat/domain/entities/character/value-objects/object'
import { PowerId } from 'src/combat/domain/entities/character/value-objects/power'
import { ModifyCombatDTO } from './types/dto'
import { CreateCombatReponse } from '../create/types/response'
import { CombatNotFoundError } from '../../errors/combat.not.found'

export class ModifyCombatCommand
    implements
        ApplicationService<
            ModifyCombatDTO,
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
        data: ModifyCombatDTO,
    ): Promise<Result<CreateCombatReponse, ApplicationError>> {
        const combat = await this.combatRepository.getById(
            new CombatId(data.id),
        )
        if (!combat) throw new CombatNotFoundError()
        if (data.date) combat.changeDate(new CombatDate(data.date))
        if (data.place) combat.changePlace(new CombatPlace(data.place))
        data.charactersToRemove.forEach((e) =>
            combat.removeCharacter(new CharacterId(e.id, e.kind)),
        )
        data.charactersToAdd.forEach((e) =>
            combat.addCharcter(
                new Character(
                    new CharacterId(e.id, e.kind),
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
