import { ApplicationService } from 'src/core/application/service/application.service'
import { GetMovieByIdDTO } from './types/dto'
import { GetMovieByIdResponse } from './types/response'
import { ApplicationError } from 'src/core/application/error/application.error'
import { MovieRepository } from '../../repositories/movie.repository'
import { Result } from 'src/core/application/result-handler/result.handler'
import { MovieId } from 'src/movie/domain/value-objects/movie.id'
import { MovieNotFoundError } from '../../errors/movie.not.found'

export class GetMovieByIdQuery implements ApplicationService<GetMovieByIdDTO, GetMovieByIdResponse, ApplicationError> {
    constructor(private readonly movieRepository: MovieRepository) {}

    async execute(data: GetMovieByIdDTO): Promise<Result<GetMovieByIdResponse, ApplicationError>> {
        const movie = await this.movieRepository.getById(new MovieId(data.id))
        if (!movie) return Result.error(new MovieNotFoundError())
        return Result.success({
            id: movie.id.value,
            title: movie.title.value,
            synopsis: movie.synopsis.value,
            creator: movie.creator.value,
            release: movie.release.value,
            director: {
                firstName: movie.director.firstName,
                lastName: movie.director.lastName,
            },
            duration: movie.duration,
            type: movie.type.value,
            cost: movie.cost,
            comic: {
                id: movie.basedOn.id.value,
                title: movie.basedOn.title.value,
                volumen: movie.basedOn.volumen.value,
                author: movie.basedOn.author,
            },
            actors: movie.actors.map((e) => ({
                id: e.id.value,
                name: e.name,
                role: e.role.value,
                character: e.character.value,
            })),
        })
    }
}
