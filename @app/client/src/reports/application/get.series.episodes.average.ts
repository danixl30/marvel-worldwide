import { ApplicationService } from '../../core/application/service/application-service'
import {
    GetSeriesByCriteriaResponse,
    SerieRepository,
} from '../../serie/application/repositories/serie.repository'

export const getSeriesThatHasMoreEpisodesThanAverageApplicationService = (
    serieRepository: SerieRepository,
): ApplicationService<undefined, GetSeriesByCriteriaResponse> => {
    const execute = () => serieRepository.getSeriesEpisodesGreaterThanAverage()

    return {
        execute,
    }
}
