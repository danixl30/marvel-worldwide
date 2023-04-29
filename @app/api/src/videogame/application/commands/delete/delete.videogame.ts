import { ApplicationService } from 'src/core/application/service/application.service'
import { DeleteVideogameDTO } from './types/dto'
import { DeleteVideogameResponse } from './types/response'
import { ApplicationError } from 'src/core/application/error/application.error'
import { VideogameRepository } from '../../repositories/videogame.repository'
import { EventHandler } from 'src/core/application/event-handler/event.handler'
import { Result } from 'src/core/application/result-handler/result.handler'
import { VideogameId } from 'src/videogame/domain/value-objects/id'
import { VideogameNotFoundError } from '../../errors/videogame.not.found'

export class DeleteVideogameCommand
    implements
        ApplicationService<
            DeleteVideogameDTO,
            DeleteVideogameResponse,
            ApplicationError
        >
{
    constructor(
        private readonly videogameRepository: VideogameRepository,
        private readonly eventHandler: EventHandler,
    ) {}

    async execute(
        data: DeleteVideogameDTO,
    ): Promise<Result<DeleteVideogameResponse, ApplicationError>> {
        const videogame = await this.videogameRepository.getById(
            new VideogameId(data.id),
        )
        if (!videogame) return Result.error(new VideogameNotFoundError())
        videogame.delete()
        await this.videogameRepository.delete(videogame)
        this.eventHandler.publish(videogame.pullEvents())
        return Result.success({
            id: data.id,
        })
    }
}
