import { ApplicationService } from 'src/core/application/service/application.service'
import { DeleteCombatDTO } from './types/dto'
import { DeleteCombatResponse } from './types/response'
import { ApplicationError } from 'src/core/application/error/application.error'
import { CombatRepository } from '../../repositories/combat.repository'
import { EventHandler } from 'src/core/application/event-handler/event.handler'
import { Result } from 'src/core/application/result-handler/result.handler'
import { CombatId } from 'src/combat/domain/value-objects/id'
import { CombatNotFoundError } from '../../errors/combat.not.found'

export class DeleteCombatCommand
    implements
        ApplicationService<
            DeleteCombatDTO,
            DeleteCombatResponse,
            ApplicationError
        >
{
    constructor(
        private readonly combatRepository: CombatRepository,
        private readonly eventHandler: EventHandler,
    ) {}

    async execute(
        data: DeleteCombatDTO,
    ): Promise<Result<DeleteCombatDTO, ApplicationError>> {
        const combat = await this.combatRepository.getById(
            new CombatId(data.id),
        )
        if (!combat) return Result.error(new CombatNotFoundError())
        combat.delete()
        await this.combatRepository.delete(combat)
        this.eventHandler.publish(combat.pullEvents())
        return Result.success({
            id: data.id,
        })
    }
}
