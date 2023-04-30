import { ApplicationService } from 'src/core/application/service/application.service'
import { CreateProfileDTO } from './types/dto'
import { CreateProfileResponse } from './types/response'
import { ApplicationError } from 'src/core/application/error/application.error'
import { Result } from 'src/core/application/result-handler/result.handler'
import { ProfileRepository } from '../../repositories/profile.repository'
import { UUIDGenerator } from 'src/core/application/UUID/UUID.generator'
import { EventHandler } from 'src/core/application/event-handler/event.handler'
import { Profile } from 'src/profile/domain/profile'
import { ProfileId } from 'src/profile/domain/value-objects/profile.id'
import { ProfileEmail } from 'src/profile/domain/value-objects/profile.email'
import { ProfileLanguage } from 'src/profile/domain/value-objects/profile.language'
import { Preference } from 'src/profile/domain/entities/preference/preference'
import { PreferenceId } from 'src/profile/domain/entities/preference/value-objects/id'
import { PreferenceTarget } from 'src/profile/domain/entities/preference/value-objects/target'

export class CreateProfileCommand
    implements
        ApplicationService<
            CreateProfileDTO,
            CreateProfileResponse,
            ApplicationError
        >
{
    constructor(
        private readonly profileRepository: ProfileRepository,
        private readonly uuidGenerator: UUIDGenerator,
        private readonly eventHandler: EventHandler,
    ) {}
    async execute(
        data: CreateProfileDTO,
    ): Promise<Result<CreateProfileResponse, ApplicationError>> {
        const profile = new Profile(
            new ProfileId(this.uuidGenerator.generate()),
            new ProfileEmail(data.email),
            new ProfileLanguage(data.language),
            data.preferences.map(
                (e) =>
                    new Preference(
                        new PreferenceId(this.uuidGenerator.generate()),
                        new PreferenceTarget(e.platform, e.kind),
                    ),
            ),
        )
        await this.profileRepository.save(profile)
        this.eventHandler.publish(profile.pullEvents())
        return Result.success({
            id: profile.id.value,
        })
    }
}
