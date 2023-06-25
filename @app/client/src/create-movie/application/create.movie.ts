import { ApplicationService } from '../../core/application/service/application-service'
import {
    CreateMovieDTO,
    MovieRepository,
} from '../../movie/application/repositories/movie.repository'

export const createMovieApplicationService = (
    movieRepository: MovieRepository,
): ApplicationService<CreateMovieDTO, void> => {
    const execute = (data: CreateMovieDTO) => movieRepository.create(data)

    return {
        execute,
    }
}
