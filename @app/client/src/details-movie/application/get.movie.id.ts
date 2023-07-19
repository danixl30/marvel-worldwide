import { ApplicationService } from '../../core/application/service/application-service'
import {
    GetMovieByIdResponse,
    MovieRepository,
} from '../../movie/application/repositories/movie.repository'

export const getMovieByIdApplicationService = (
    movieRepository: MovieRepository,
): ApplicationService<string, GetMovieByIdResponse> => {
    const execute = (id: string) => movieRepository.getById(id)

    return {
        execute,
    }
}
