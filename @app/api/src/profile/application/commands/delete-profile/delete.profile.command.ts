import { ApplicationService } from 'src/core/application/service/application.service'
import { DeleteProfileDTO } from './types/dto'
import { DeleteProfileResponse } from './types/response'
import { Result } from 'src/core/application/result-handler/result.handler'
import { ApplicationError } from 'src/core/application/error/application.error'
import { ProfileRepository } from '../../repositories/profile.repository'
import { EventHandler } from 'src/core/application/event-handler/event.handler'
import { ProfileId } from 'src/profile/domain/value-objects/profile.id'
import { ProfileNotFoundError } from '../../errors/profile.not.found'

export class DeleteProfileCommand
    implements
        ApplicationService<
            DeleteProfileDTO,
            DeleteProfileResponse,
            ApplicationError
        >
{
    constructor(
        private readonly profileRepository: ProfileRepository,
        private readonly eventHandler: EventHandler,
    ) {}
    async execute(
        data: DeleteProfileDTO,
    ): Promise<Result<DeleteProfileResponse, any>> {
        const profile = await this.profileRepository.getById(
            new ProfileId(data.id),
        )
        if (!profile) return Result.error(new ProfileNotFoundError())
        await this.profileRepository.delete(profile)
        profile.delete()
        this.eventHandler.publish(profile.pullEvents())
        return Result.success({
            id: profile.id.value,
        })
    }
}
