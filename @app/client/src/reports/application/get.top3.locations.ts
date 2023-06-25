import { CombatRepository } from '../../combat/application/repositories/combat.repository'
import { ApplicationService } from '../../core/application/service/application-service'

export const getTop3LocationsApplicationService = (
    combatRepository: CombatRepository,
): ApplicationService<undefined, string[]> => {
    const execute = () => combatRepository.getTop3Locations()

    return {
        execute,
    }
}
