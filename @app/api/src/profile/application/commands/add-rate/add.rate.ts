import { ApplicationService } from 'src/core/application/service/application.service'
import { AddRateDTO } from './types/dto'
import { AddRateResponse } from './types/response'
import { ApplicationError } from 'src/core/application/error/application.error'
import { Result } from 'src/core/application/result-handler/result.handler'
import { ProfileRepository } from '../../repositories/profile.repository'
import { EventHandler } from 'src/core/application/event-handler/event.handler'
import { Rate } from 'src/profile/domain/entities/rate/rate'
import { ProfileNotFoundError } from '../../errors/profile.not.found'
import { ProfileId } from 'src/profile/domain/value-objects/profile.id'
import { RateId } from 'src/profile/domain/entities/rate/value-objects/rate.id'
import { RateCalification } from 'src/profile/domain/entities/rate/value-objects/rate.calification'
import { RateKind } from 'src/profile/domain/entities/rate/value-objects/rate.kind'

export class AddRateCommand
    implements
        ApplicationService<AddRateDTO, AddRateResponse, ApplicationError>
{
    constructor(
        private readonly profileRepository: ProfileRepository,
        private readonly eventHandler: EventHandler,
    ) {}

    async execute(
        data: AddRateDTO,
    ): Promise<Result<AddRateResponse, ApplicationError>> {
        const profile = await this.profileRepository.getById(
            new ProfileId(data.profileId),
        )
        if (!profile) return Result.error(new ProfileNotFoundError())
        const rateId = new RateId(data.target)
        const rate = new Rate(
            rateId,
            new RateKind(data.kind),
            new RateCalification(data.calification),
        )
        profile.removeRate(rate)
        profile.addRate(rate)
        await this.profileRepository.save(profile)
        this.eventHandler.publish(profile.pullEvents())
        return Result.success({
            rateId: rate.id.value,
        })
    }
}
