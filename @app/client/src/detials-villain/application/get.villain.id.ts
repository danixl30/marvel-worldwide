import { ApplicationService } from '../../core/application/service/application-service'
import {
    GetVillainByIdResponse,
    VillainRepository,
} from '../../villain/application/repositories/villain.repository'

export const getVillainByIdApplicationService = (
    villainRepository: VillainRepository,
): ApplicationService<string, GetVillainByIdResponse> => {
    const execute = (id: string) => villainRepository.getById(id)

    return {
        execute,
    }
}
