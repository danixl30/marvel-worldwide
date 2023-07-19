import { ApplicationService } from '../../core/application/service/application-service'
import {
    GetSerieByIdResponse,
    SerieRepository,
} from '../../serie/application/repositories/serie.repository'

export const getSerieByIdApplicationService = (
    serieRepository: SerieRepository,
): ApplicationService<string, GetSerieByIdResponse> => {
    const execute = (id: string) => serieRepository.getById(id)

    return {
        execute,
    }
}
