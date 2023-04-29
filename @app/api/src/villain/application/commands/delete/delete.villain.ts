import { ApplicationService } from 'src/core/application/service/application.service'
import { EventHandler } from 'src/core/application/event-handler/event.handler'
import { Result } from 'src/core/application/result-handler/result.handler'
import { ApplicationError } from 'src/core/application/error/application.error'
import { VillainRepository } from '../../repositories/villain.repository'
import { DeleteVillainDTO } from './types/dto'
import { DeleteVillainResponse } from './types/response'
import { VillainId } from 'src/villain/domain/value-object/villain.id'
import { VillainNotFoundError } from '../../errors/villain.not.found'

export class DeleteVillainCommand
    implements
        ApplicationService<
            DeleteVillainDTO,
            DeleteVillainResponse,
            ApplicationError
        >
{
    constructor(
        private readonly villainRepository: VillainRepository,
        private readonly eventHandler: EventHandler,
    ) {}

    async execute(
        data: DeleteVillainDTO,
    ): Promise<Result<DeleteVillainResponse, ApplicationError>> {
        const villain = await this.villainRepository.getById(
            new VillainId(data.id),
        )
        if (!villain) return Result.error(new VillainNotFoundError())
        villain.delete()
        await this.villainRepository.delete(villain)
        this.eventHandler.publish(villain.pullEvents())
        return Result.success({
            id: data.id,
        })
    }
}
