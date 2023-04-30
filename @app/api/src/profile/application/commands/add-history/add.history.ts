import { ApplicationService } from 'src/core/application/service/application.service'
import { AddHistoryDTO } from './types/dto'
import { AddHistoryResponse } from './types/response'
import { ApplicationError } from 'src/core/application/error/application.error'
import { ProfileRepository } from '../../repositories/profile.repository'
import { UUIDGenerator } from 'src/core/application/UUID/UUID.generator'
import { EventHandler } from 'src/core/application/event-handler/event.handler'
import { Result } from 'src/core/application/result-handler/result.handler'
import { ProfileId } from 'src/profile/domain/value-objects/profile.id'
import { ProfileNotFoundError } from '../../errors/profile.not.found'
import { History } from 'src/profile/domain/entities/history/history'
import { HistoryId } from 'src/profile/domain/entities/history/value-objects/id'
import { HistoryTarget } from 'src/profile/domain/entities/history/value-objects/target'

export class AddHistoryCommand
    implements
        ApplicationService<AddHistoryDTO, AddHistoryResponse, ApplicationError>
{
    constructor(
        private readonly profileRepository: ProfileRepository,
        private readonly uuidGenerator: UUIDGenerator,
        private readonly eventHandler: EventHandler,
    ) {}

    async execute(
        data: AddHistoryDTO,
    ): Promise<Result<AddHistoryResponse, ApplicationError>> {
        const profile = await this.profileRepository.getById(
            new ProfileId(data.profileId),
        )
        if (!profile) return Result.error(new ProfileNotFoundError())
        const history = new History(
            new HistoryId(this.uuidGenerator.generate()),
            new HistoryTarget(data.target, data.kind),
        )
        profile.addHistory(history)
        await this.profileRepository.save(profile)
        this.eventHandler.publish(profile.pullEvents())
        return Result.success({
            historyId: history.id.value,
        })
    }
}
