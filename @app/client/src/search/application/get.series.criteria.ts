import { GetByCriteriaDTO } from '../../civil/application/repositories/civil.repository'
import { ApplicationService } from '../../core/application/service/application-service'
import {
    GetSeriesByCriteriaResponse,
    SerieRepository,
} from '../../serie/application/repositories/serie.repository'

export const getSeriesByCriteriaApplicationService = (
    serieRepository: SerieRepository,
): ApplicationService<GetByCriteriaDTO, GetSeriesByCriteriaResponse> => {
    const execute = (data: GetByCriteriaDTO) =>
        serieRepository.getByCriteria(data)

    return {
        execute,
    }
}
