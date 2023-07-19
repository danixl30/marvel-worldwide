import { ApplicationService } from '../../core/application/service/application-service'
import {
    GetMoviesThatIsAnimatedAnd2hAndHalfMoreResponse,
    MovieRepository,
} from '../../movie/application/repositories/movie.repository'

export const getMovies2HAnimatedApplicationService = (
    movieRepository: MovieRepository,
): ApplicationService<
    undefined,
    GetMoviesThatIsAnimatedAnd2hAndHalfMoreResponse
> => {
    const execute = () => movieRepository.getMovies2HAnimated()

    return {
        execute,
    }
}
