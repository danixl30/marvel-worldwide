import { ApplicationService } from '../../core/application/service/application-service'
import {
    GetSuperInheritedPowersResponse,
    VillainRepository,
} from '../../villain/application/repositories/villain.repository'

export const getSuperPowersApplicationService = (
    villainRepository: VillainRepository,
): ApplicationService<undefined, GetSuperInheritedPowersResponse> => {
    const execute = () => villainRepository.getSuperPowers()

    return {
        execute,
    }
}
