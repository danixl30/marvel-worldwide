import { ApplicationService } from '../../../../core/application/service/application-service'
import {
    GetVideogamesTop10HistoryResponse,
    VideogameRepository,
} from '../../../../videogames/application/repositories/videogame.repository'

export const getVideogamesTop10HistoryApplicationService = (
    videogameRepository: VideogameRepository,
): ApplicationService<undefined, GetVideogamesTop10HistoryResponse> => {
    const execute = () => videogameRepository.getTop10History()

    return {
        execute,
    }
}
