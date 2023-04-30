import { ApplicationService } from 'src/core/application/service/application.service'
import { GetMoviesThatIsAnimatedAnd2hAndHalfMoreResponse } from './types/response'
import { ApplicationError } from 'src/core/application/error/application.error'
import { MovieRepository } from '../../repositories/movie.repository'
import { Result } from 'src/core/application/result-handler/result.handler'
import { GetMoviesByCriteriaResponse } from '../get-by-criteria/types/response'
import { MovieType } from 'src/movie/domain/value-objects/type'
import { filterMoviesByDurationGreaterThan2H30MAndGreaterThanAverageCost } from 'src/movie/domain/services/filter.2h.cost.service'

export class GetMoviesThatIsAnimatedAnd2hAndHalfMoreQuery
    implements
        ApplicationService<
            undefined,
            GetMoviesThatIsAnimatedAnd2hAndHalfMoreResponse,
            ApplicationError
        >
{
    constructor(private readonly movieRepository: MovieRepository) {}

    async execute(): Promise<
        Result<GetMoviesByCriteriaResponse, ApplicationError>
    > {
        const movies = await this.movieRepository.getByType(
            new MovieType('animated'),
        )
        if (movies.isEmpty()) return Result.success([])
        const moviesFiltered =
            filterMoviesByDurationGreaterThan2H30MAndGreaterThanAverageCost(
                movies,
            )
        return Result.success(
            moviesFiltered.map((e) => ({
                id: e.id.value,
                title: e.title.value,
                synopsis: e.synopsis.value,
                rating: e.rating,
            })),
        )
    }
}
