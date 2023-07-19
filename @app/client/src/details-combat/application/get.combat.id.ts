import {
    CombatRepository,
    GetCombatByIdResponse,
} from '../../combat/application/repositories/combat.repository'
import { ApplicationService } from '../../core/application/service/application-service'

export const getCombatByIdApplicationService = (
    combatRepository: CombatRepository,
): ApplicationService<string, GetCombatByIdResponse> => {
    const execute = (id: string) => combatRepository.getById(id)

    return {
        execute,
    }
}
