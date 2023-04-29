import { ApplicationService } from 'src/core/application/service/application.service'
import { DeleteMovieDTO } from './types/dto'
import { DeleteMovieResponse } from './types/response'
import { ApplicationError } from 'src/core/application/error/application.error'
import { MovieRepository } from '../../repositories/movie.repository'
import { EventHandler } from 'src/core/application/event-handler/event.handler'
import { Result } from 'src/core/application/result-handler/result.handler'
import { MovieId } from 'src/movie/domain/value-objects/movie.id'
import { MovieNotFoundError } from '../../errors/movie.not.found'

export class DeleteMovieCommand implements ApplicationService<DeleteMovieDTO, DeleteMovieResponse, ApplicationError> {
    constructor(private readonly movieRepository: MovieRepository, private readonly eventHandler: EventHandler) {}

    async execute(data: DeleteMovieDTO): Promise<Result<DeleteMovieResponse, ApplicationError>> {
        const movie = await this.movieRepository.getById(new MovieId(data.id))
        if (!movie) return Result.error(new MovieNotFoundError())
        movie.delete()
        await this.movieRepository.delete(movie)
        this.eventHandler.publish(movie.pullEvents())
        return Result.success({
            id: data.id,
        })
    }
}
