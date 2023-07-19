import { ApplicationService } from '../../../core/application/service/application-service'
import {
    ModifyMovieDTO,
    MovieRepository,
} from '../../../movie/application/repositories/movie.repository'

export const modifyMovieApplicationService = (
    movieRepository: MovieRepository,
): ApplicationService<ModifyMovieDTO, void> => {
    const execute = (data: ModifyMovieDTO) => movieRepository.modify(data)

    return {
        execute,
    }
}
