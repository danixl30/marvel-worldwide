import { ApplicationService } from '../../core/application/service/application-service'
import {
    CreateVillainDTO,
    VillainRepository,
} from '../../villain/application/repositories/villain.repository'

export const createVillainApplicationService = (
    villainRepository: VillainRepository,
): ApplicationService<CreateVillainDTO, void> => {
    const execute = async (data: CreateVillainDTO) => {
        await villainRepository.create(data)
    }

    return {
        execute,
    }
}
