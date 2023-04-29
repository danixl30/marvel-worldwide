import { ApplicationService } from 'src/core/application/service/application.service'
import { DeleteCivilDTO } from './types/dto'
import { DeleteCivilResponse } from './types/response'
import { CivilRepository } from '../../repositories/civil.repository'
import { EventHandler } from 'src/core/application/event-handler/event.handler'
import { Result } from 'src/core/application/result-handler/result.handler'
import { ApplicationError } from 'src/core/application/error/application.error'
import { CivilId } from 'src/civil/domain/value-objects/id'
import { CivilNotFoundError } from '../../exceptions/civil.not.found'

export class DeleteCivilCommand
    implements
        ApplicationService<
            DeleteCivilDTO,
            DeleteCivilResponse,
            ApplicationError
        >
{
    constructor(
        private readonly civilRepository: CivilRepository,
        private readonly eventHandler: EventHandler,
    ) {}

    async execute(
        data: DeleteCivilDTO,
    ): Promise<Result<DeleteCivilResponse, ApplicationError>> {
        const civil = await this.civilRepository.getById(new CivilId(data.id))
        if (!civil) return Result.error(new CivilNotFoundError())
        await this.civilRepository.delete(civil)
        civil.delete()
        this.eventHandler.publish(civil.pullEvents())
        return Result.success({
            id: data.id,
        })
    }
}
