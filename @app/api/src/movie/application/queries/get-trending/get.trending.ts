import { ApplicationService } from 'src/core/application/service/application.service'
import { GetMoviesTrendingDTO } from './types/dto'
import { GetMoviesTrendingResponse } from './types/response'
import { ApplicationError } from 'src/core/application/error/application.error'
import { MovieRepository } from '../../repositories/movie.repository'
import { Result } from 'src/core/application/result-handler/result.handler'
import { GetMoviesByCriteriaResponse } from '../get-by-criteria/types/response'
import { ProfileId } from 'src/profile/domain/value-objects/profile.id'

export class GetMoviesTrendingQuery
    implements
        ApplicationService<
            GetMoviesTrendingDTO,
            GetMoviesTrendingResponse,
            ApplicationError
        >
{
    constructor(private readonly movieRepository: MovieRepository) {}

    async execute(
        data: GetMoviesTrendingDTO,
    ): Promise<Result<GetMoviesByCriteriaResponse, ApplicationError>> {
        const movies = await this.movieRepository.getTrending(
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
