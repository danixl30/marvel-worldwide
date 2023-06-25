import {
    CombatRepository,
    CreateCombatDTO,
} from '../../combat/application/repositories/combat.repository'
import { ApplicationService } from '../../core/application/service/application-service'

export const createCombatApplicationService = (
    combatRepository: CombatRepository,
): ApplicationService<CreateCombatDTO, void> => {
    const execute = (data: CreateCombatDTO) => combatRepository.create(data)

    return {
        execute,
    }
}
