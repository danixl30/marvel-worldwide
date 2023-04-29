import { ApplicationService } from 'src/core/application/service/application.service'
import { GetVideogameByIdDTO } from './types/dto'
import { GetVideogameByIdResponse } from './types/response'
import { ApplicationError } from 'src/core/application/error/application.error'
import { VideogameRepository } from '../../repositories/videogame.repository'
import { Result } from 'src/core/application/result-handler/result.handler'
import { VideogameId } from 'src/videogame/domain/value-objects/id'
import { VideogameNotFoundError } from '../../errors/videogame.not.found'

export class GetVideogameByIdQuery implements ApplicationService<GetVideogameByIdDTO, GetVideogameByIdResponse, ApplicationError> {
    constructor(private readonly vidogameRepository: VideogameRepository) {}

    async execute(data: GetVideogameByIdDTO): Promise<Result<GetVideogameByIdResponse, ApplicationError>> {
        const videogame = await this.vidogameRepository.getById(new VideogameId(data.id))
        if (!videogame) return Result.error(new VideogameNotFoundError())
        return Result.success({
            id: videogame.id.value,
            title: videogame.title.value,
            synopsis: videogame.synopsis.value,
            creator: videogame.creator.value,
            release: videogame.release.value,
            type: videogame.type.value,
            platforms: videogame.platforms.map((e) => e.value),
            comic: {
                id: videogame.basedOn.id.value,
                title: videogame.basedOn.title.value,
                volumen: videogame.basedOn.volumen.value,
                author: videogame.basedOn.author,
            },
            actors: videogame.actors.map((e) => ({
                id: e.id.value,
                name: e.name,
                role: e.role.value,
                character: e.character.value,
            })),
            rating: videogame.rating.value,
        })
    }
}
