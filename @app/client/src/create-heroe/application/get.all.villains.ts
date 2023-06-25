import { ApplicationService } from '../../core/application/service/application-service'
import {
    VillainList,
    VillainRepository,
} from '../../villain/application/repositories/villain.repository'

export const getAllVillainsApplicationService = (
    villainRepository: VillainRepository,
): ApplicationService<undefined, VillainList[]> => {
    const execute = () => villainRepository.getAll()

    return {
        execute,
    }
}
