import { ApplicationService } from 'src/core/application/service/application.service'
import { AddRateDTO } from './types/dto'
import { AddRateResponse } from './types/response'
import { ApplicationError } from 'src/core/application/error/application.error'
import { Result } from 'src/core/application/result-handler/result.handler'
import { ProfileRepository } from '../../repositories/profile.repository'
import { UUIDGenerator } from 'src/core/application/UUID/UUID.generator'
import { EventHandler } from 'src/core/application/event-handler/event.handler'
import { Rate } from 'src/profile/domain/entities/rate/rate'
import { ProfileNotFoundError } from '../../errors/profile.not.found'
import { ProfileId } from 'src/profile/domain/value-objects/profile.id'
import { RateId } from 'src/profile/domain/entities/rate/value-objects/rate.id'
import { RateTarget } from 'src/profile/domain/entities/rate/value-objects/rate.target'
import { RateCalification } from 'src/profile/domain/entities/rate/value-objects/rate.calification'

export class AddRateCommand
    implements
        ApplicationService<AddRateDTO, AddRateResponse, ApplicationError>
{
    constructor(
        private readonly profileRepository: ProfileRepository,
        private readonly uuidGenerator: UUIDGenerator,
        private readonly eventHandler: EventHandler,
    ) {}

    async execute(
        data: AddRateDTO,
    ): Promise<Result<AddRateResponse, ApplicationError>> {
        const profile = await this.profileRepository.getById(
            new ProfileId(data.profileId),
        )
        if (!profile) return Result.error(new ProfileNotFoundError())
        const rate = new Rate(
            new RateId(this.uuidGenerator.generate()),
            new RateTarget(data.target, data.kind),
            new RateCalification(data.calification),
        )
        profile.addRate(rate)
        await this.profileRepository.save(profile)
        this.eventHandler.publish(profile.pullEvents())
        return Result.success({
            rateId: rate.id.value,
        })
    }
}
