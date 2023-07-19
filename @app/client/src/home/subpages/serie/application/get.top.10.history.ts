import { ApplicationService } from '../../../../core/application/service/application-service'
import {
    GetSeriesTop10HistoryResponse,
    SerieRepository,
} from '../../../../serie/application/repositories/serie.repository'

export const getSeriesTop10HistoryApplicationService = (
    serieRepository: SerieRepository,
): ApplicationService<undefined, GetSeriesTop10HistoryResponse> => {
    const execute = () => serieRepository.getTop10History()

    return {
        execute,
    }
}
