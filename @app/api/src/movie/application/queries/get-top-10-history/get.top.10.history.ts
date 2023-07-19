import { ApplicationService } from 'src/core/application/service/application.service'
import { GetMoviesTop10HistoryDTO } from './types/dto'
import { GetMoviesTop10HistoryResponse } from './types/response'
import { ApplicationError } from 'src/core/application/error/application.error'
import { MovieRepository } from '../../repositories/movie.repository'
import { Result } from 'src/core/application/result-handler/result.handler'
import { GetMoviesByCriteriaResponse } from '../get-by-criteria/types/response'
import { ProfileId } from 'src/profile/domain/value-objects/profile.id'

export class GetMoviesTop10HistoryQuery
    implements
        ApplicationService<
            GetMoviesTop10HistoryDTO,
            GetMoviesTop10HistoryResponse,
            ApplicationError
        >
{
    constructor(private movieRepository: MovieRepository) {}

    async execute(
        data: GetMoviesTop10HistoryDTO,
    ): Promise<Result<GetMoviesByCriteriaResponse, ApplicationError>> {
        const movies = await this.movieRepository.getTop10History(
            new ProfileId(data.profileId),
        )
        return Result.success(
            movies.map((e) => ({
                id: e.id.value,
                title: e.title.value,
                synopsis: e.synopsis.value,
                rating: e.rating,
            })),
        )
    }
}
