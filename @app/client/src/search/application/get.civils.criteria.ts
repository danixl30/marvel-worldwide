import {
    CivilRepository,
    GetByCriteriaDTO,
    GetCivilsByCriteriaResponse,
} from '../../civil/application/repositories/civil.repository'
import { ApplicationService } from '../../core/application/service/application-service'

export const getCivilsByCriteriaApplicationService = (
    civilRepository: CivilRepository,
): ApplicationService<GetByCriteriaDTO, GetCivilsByCriteriaResponse> => {
    const execute = (data: GetByCriteriaDTO) =>
        civilRepository.getByCriteria(data)

    return {
        execute,
    }
}
