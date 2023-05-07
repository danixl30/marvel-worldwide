import { ApplicationService } from 'src/core/application/service/application.service'
import { GetCombatByIdDTO } from './types/dto'
import { GetCombatByIdResponse } from './types/response'
import { ApplicationError } from 'src/core/application/error/application.error'
import { CombatRepository } from '../../repositories/combat.repository'
import { Result } from 'src/core/application/result-handler/result.handler'
import { CombatId } from 'src/combat/domain/value-objects/id'
import { CombatNotFoundError } from '../../errors/combat.not.found'

export class GetCombatByIdQuery
    implements
        ApplicationService<
            GetCombatByIdDTO,
            GetCombatByIdResponse,
            ApplicationError
        >
{
    constructor(private readonly combatRepository: CombatRepository) {}

    async execute(
        data: GetCombatByIdDTO,
    ): Promise<Result<GetCombatByIdResponse, ApplicationError>> {
        const combat = await this.combatRepository.getById(
            new CombatId(data.id),
        )
        if (!combat) return Result.error(new CombatNotFoundError())
        return Result.success({
            id: combat.id.value,
            date: combat.date.value,
            place: combat.place.value,
            characters: combat.characters.map((character) => ({
                id: character.id.value,
                powers: character.powers.map((e) => e.value),
                objects: character.objects.map((e) => e.value),
            })),
        })
    }
}
