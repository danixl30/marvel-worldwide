import { ApplicationService } from '../../../../core/application/service/application-service'
import {
    GetSeriesTrendigResponse,
    SerieRepository,
} from '../../../../serie/application/repositories/serie.repository'

export const getSeriesTrendingApplicationService = (
    serieRepository: SerieRepository,
): ApplicationService<undefined, GetSeriesTrendigResponse> => {
    const execute = () => serieRepository.getTrending()

    return {
        execute,
    }
}
