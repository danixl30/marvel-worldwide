import { ApplicationService } from '../../core/application/service/application-service'
import {
    GetVideogameByIdResponse,
    VideogameRepository,
} from '../../videogames/application/repositories/videogame.repository'

export const getVideogameByIdApplicationService = (
    videogameRepository: VideogameRepository,
): ApplicationService<string, GetVideogameByIdResponse> => {
    const execute = (id: string) => videogameRepository.getById(id)

    return {
        execute,
    }
}
