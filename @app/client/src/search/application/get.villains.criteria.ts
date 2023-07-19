import { GetByCriteriaDTO } from '../../civil/application/repositories/civil.repository'
import { ApplicationService } from '../../core/application/service/application-service'
import {
    GetVillainsByCriteriaResponse,
    VillainRepository,
} from '../../villain/application/repositories/villain.repository'

export const getVillainsByCriteriaApplicationService = (
    villainRepository: VillainRepository,
): ApplicationService<GetByCriteriaDTO, GetVillainsByCriteriaResponse> => {
    const execute = (data: GetByCriteriaDTO) =>
        villainRepository.getByCriteria(data)

    return {
        execute,
    }
}
