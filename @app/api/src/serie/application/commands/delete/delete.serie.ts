import { ApplicationService } from 'src/core/application/service/application.service'
import { DeleteSerieDTO } from './types/dto'
import { DeleteSerieResponse } from './types/response'
import { ApplicationError } from 'src/core/application/error/application.error'
import { SerieRepository } from '../../repositories/serie.repository'
import { EventHandler } from 'src/core/application/event-handler/event.handler'
import { Result } from 'src/core/application/result-handler/result.handler'
import { SerieId } from 'src/serie/domain/value-objects/id'
import { SerieNotFoundError } from '../../errors/serie.not.found'

export class DeleteSerieCommand implements ApplicationService<DeleteSerieDTO, DeleteSerieResponse, ApplicationError> {
    constructor(private readonly serieRepository: SerieRepository, private readonly eventHandler: EventHandler) {}

    async execute(data: DeleteSerieDTO): Promise<Result<DeleteSerieResponse, ApplicationError>> {
        const serie = await this.serieRepository.getById(new SerieId(data.id))
        if (!serie) return Result.error(new SerieNotFoundError())
        serie.delete()
        await this.serieRepository.delete(serie)
        this.eventHandler.publish(serie.pullEvents())
        return Result.success({
            id: data.id,
        })
    }
}
