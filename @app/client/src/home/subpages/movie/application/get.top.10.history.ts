import { ApplicationService } from '../../../../core/application/service/application-service'
import {
    GetMoviesTop10HistoryResponse,
    MovieRepository,
} from '../../../../movie/application/repositories/movie.repository'

export const getMovieTop10HistoryApplicationService = (
    movieRepository: MovieRepository,
): ApplicationService<undefined, GetMoviesTop10HistoryResponse> => {
    const execute = () => movieRepository.getTop10History()

    return {
        execute,
    }
}
