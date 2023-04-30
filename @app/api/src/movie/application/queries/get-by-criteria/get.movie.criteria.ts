import { ApplicationService } from 'src/core/application/service/application.service'
import { GetMoviesByCriteriaDTO } from './types/dto'
import { GetMoviesByCriteriaResponse } from './types/response'
import { ApplicationError } from 'src/core/application/error/application.error'
import { MovieRepository } from '../../repositories/movie.repository'
import { SearchByCriteriaDTO } from 'src/civil/application/repositories/types/search.criteria.dto'
import { Result } from 'src/core/application/result-handler/result.handler'

export class GetMoviesByCriteriaQuery
    implements
        ApplicationService<
            GetMoviesByCriteriaDTO,
            GetMoviesByCriteriaResponse,
            ApplicationError
        >
{
    constructor(private readonly movieRepository: MovieRepository) {}

    async execute(
        data: SearchByCriteriaDTO,
    ): Promise<Result<GetMoviesByCriteriaResponse, ApplicationError>> {
        const movies = await this.movieRepository.getByCriteria(data)
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
