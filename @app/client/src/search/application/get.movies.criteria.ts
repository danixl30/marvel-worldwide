import { GetByCriteriaDTO } from '../../civil/application/repositories/civil.repository'
import { ApplicationService } from '../../core/application/service/application-service'
import {
    GetMoviesByCriteriaResponse,
    MovieRepository,
} from '../../movie/application/repositories/movie.repository'

export const getMoviesByCriteriaApplicationService = (
    movieRepository: MovieRepository,
): ApplicationService<GetByCriteriaDTO, GetMoviesByCriteriaResponse> => {
    const execute = (data: GetByCriteriaDTO) =>
        movieRepository.getByCriteria(data)

    return {
        execute,
    }
}
