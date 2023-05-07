import { ApplicationService } from 'src/core/application/service/application.service'
import { GetComabtsByCriteriaDTO } from './types/dto'
import { GetComabtsByCriteriaResponse } from './types/response'
import { ApplicationError } from 'src/core/application/error/application.error'
import { CombatRepository } from '../../repositories/combat.repository'
import { SearchByCriteriaDTO } from 'src/civil/application/repositories/types/search.criteria.dto'
import { Result } from 'src/core/application/result-handler/result.handler'

export class GetComabtsByCriteriaQuery
    implements
        ApplicationService<
            GetComabtsByCriteriaDTO,
            GetComabtsByCriteriaResponse,
            ApplicationError
        >
{
    constructor(private readonly combatRepository: CombatRepository) {}

    async execute(
        data: SearchByCriteriaDTO,
    ): Promise<Result<GetComabtsByCriteriaResponse, ApplicationError>> {
        const combats = await this.combatRepository.getByCriteria(data)
        return Result.success(
            combats.map((combat) => ({
                id: combat.id.value,
                date: combat.date.value,
                place: combat.place.value,
                characters: combat.characters.map((character) => ({
                    id: character.id.value,
                    powers: character.powers.map((e) => e.value),
                    objects: character.objects.map((e) => e.value),
                })),
            })),
        )
    }
}
