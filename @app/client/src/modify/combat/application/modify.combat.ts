import {
    CombatRepository,
    ModifyCombatDTO,
} from '../../../combat/application/repositories/combat.repository'
import { ApplicationService } from '../../../core/application/service/application-service'

export const modifyCombatApplicationService = (
    combatRepository: CombatRepository,
): ApplicationService<ModifyCombatDTO, void> => {
    const execute = (data: ModifyCombatDTO) => combatRepository.modify(data)

    return {
        execute,
    }
}
