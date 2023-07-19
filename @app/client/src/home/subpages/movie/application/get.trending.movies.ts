import { ApplicationService } from '../../../../core/application/service/application-service'
import {
    GetMoviesTrendingResponse,
    MovieRepository,
} from '../../../../movie/application/repositories/movie.repository'

export const getMovieTrendingApplicationService = (
    movieRepository: MovieRepository,
): ApplicationService<undefined, GetMoviesTrendingResponse> => {
    const execute = () => movieRepository.getTrending()

    return {
        execute,
    }
}
