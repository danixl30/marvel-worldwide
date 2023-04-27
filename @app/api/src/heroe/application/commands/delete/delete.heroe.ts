import { ApplicationService } from 'src/core/application/service/application.service'
import { EventHandler } from 'src/core/application/event-handler/event.handler'
import { Result } from 'src/core/application/result-handler/result.handler'
import { ApplicationError } from 'src/core/application/error/application.error'
import { HeroeRepository } from '../../repositories/heroe.repository'
import { DeleteHeroeDTO } from './types/dto'
import { DeleteHeroeResponse } from './types/response'
import { HeroeId } from 'src/heroe/domain/value-object/heroe.id'
import { HeroeNotFoundError } from '../../errors/heroe.not.found'

export class DeleteHeroeCommand implements ApplicationService<DeleteHeroeDTO, DeleteHeroeResponse, ApplicationError> {
    constructor(private readonly heroeRepository: HeroeRepository, private readonly eventHandler: EventHandler) {}

    async execute(data: DeleteHeroeDTO): Promise<Result<DeleteHeroeResponse, ApplicationError>> {
        const heroe = await this.heroeRepository.getById(new HeroeId(data.id))
        if (!heroe) return Result.error(new HeroeNotFoundError())
        heroe.delete()
        await this.heroeRepository.delete(heroe)
        this.eventHandler.publish(heroe.pullEvents())
        return Result.success({
            id: data.id,
        })
    }
}
