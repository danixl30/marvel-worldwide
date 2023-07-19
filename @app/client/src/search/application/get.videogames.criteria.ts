import { GetByCriteriaDTO } from '../../civil/application/repositories/civil.repository'
import { ApplicationService } from '../../core/application/service/application-service'
import {
    GetVideogamesByCriteriaResponse,
    VideogameRepository,
} from '../../videogames/application/repositories/videogame.repository'

export const getVideogamesByCriteriaApplicationService = (
    videogameRepository: VideogameRepository,
): ApplicationService<GetByCriteriaDTO, GetVideogamesByCriteriaResponse> => {
    const execute = (data: GetByCriteriaDTO) =>
        videogameRepository.getByCriteria(data)

    return {
        execute,
    }
}
