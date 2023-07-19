import { ApplicationService } from '../../../../core/application/service/application-service'
import {
    GetVideogamesTrendingResponse,
    VideogameRepository,
} from '../../../../videogames/application/repositories/videogame.repository'

export const getVideogamesTrendingApplicationService = (
    videogameRepository: VideogameRepository,
): ApplicationService<undefined, GetVideogamesTrendingResponse> => {
    const execute = () => videogameRepository.getTrending()

    return {
        execute,
    }
}
