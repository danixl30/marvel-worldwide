import { GetByCriteriaDTO } from '../../civil/application/repositories/civil.repository'
import {
    CombatRepository,
    GetCombatsByCriteriaResponse,
} from '../../combat/application/repositories/combat.repository'
import { ApplicationService } from '../../core/application/service/application-service'

export const getCombatsByCriteriaApplicationService = (
    combatRepository: CombatRepository,
): ApplicationService<GetByCriteriaDTO, GetCombatsByCriteriaResponse> => {
    const execute = (data: GetByCriteriaDTO) =>
        combatRepository.getByCriteria(data)

    return {
        execute,
    }
}
