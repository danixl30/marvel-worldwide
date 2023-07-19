import { ApplicationService } from '../../../core/application/service/application-service'
import {
    ModifyVillainDTO,
    VillainRepository,
} from '../../../villain/application/repositories/villain.repository'

export const modifyVillainApplicationService = (
    villainRepository: VillainRepository,
): ApplicationService<ModifyVillainDTO, void> => {
    const execute = (data: ModifyVillainDTO) => villainRepository.modify(data)

    return {
        execute,
    }
}
