import { ApplicationService } from 'src/core/application/service/application.service'
import { EndHistoryDTO } from './types/dto'
import { EndHistoryResponse } from './types/response'
import { ApplicationError } from 'src/core/application/error/application.error'
import { Result } from 'src/core/application/result-handler/result.handler'
import { ProfileRepository } from '../../repositories/profile.repository'
import { EventHandler } from 'src/core/application/event-handler/event.handler'
import { ProfileId } from 'src/profile/domain/value-objects/profile.id'
import { ProfileNotFoundError } from '../../errors/profile.not.found'
import { HistoryId } from 'src/profile/domain/entities/history/value-objects/id'

export class EndHistoryCommand
    implements
        ApplicationService<EndHistoryDTO, EndHistoryResponse, ApplicationError>
{
    constructor(
        private readonly profileRepository: ProfileRepository,
        private readonly eventHandler: EventHandler,
    ) {}

    async execute(
        data: EndHistoryDTO,
    ): Promise<Result<EndHistoryResponse, ApplicationError>> {
        const profile = await this.profileRepository.getById(
            new ProfileId(data.profileId),
        )
        if (!profile) return Result.error(new ProfileNotFoundError())
        profile.endHistory(new HistoryId(data.history))
        await this.profileRepository.save(profile)
        this.eventHandler.publish(profile.pullEvents())
        return Result.success({
            historyId: data.history,
        })
    }
}
