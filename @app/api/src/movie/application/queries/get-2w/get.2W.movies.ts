import { ApplicationService } from 'src/core/application/service/application.service'
import { GetMovies2WResponse } from './types/response'
import { ApplicationError } from 'src/core/application/error/application.error'
import { Result } from 'src/core/application/result-handler/result.handler.js'
import { MovieRepository } from '../../repositories/movie.repository.js'

export class GetMovies2WQuery
    implements
        ApplicationService<undefined, GetMovies2WResponse, ApplicationError>
{
    constructor(private readonly movieRepository: MovieRepository) {}

    async execute(): Promise<Result<GetMovies2WResponse, ApplicationError>> {
        const movies = await this.movieRepository.getAtLeast2WeeksNearRelease()
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
