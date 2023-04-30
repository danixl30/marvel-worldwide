import { ApplicationService } from 'src/core/application/service/application.service'
import { AddRateDTO } from './types/dto'
import { AddRateResponse } from './types/response'
import { ApplicationError } from 'src/core/application/error/application.error'
import { Result } from 'src/core/application/result-handler/result.handler'
import { EventHandler } from 'src/core/application/event-handler/event.handler'
import { Rate } from 'src/movie/domain/entities/rate/rate'
import { RateId } from 'src/movie/domain/entities/rate/value-objects/rate.id'
import { RateCalification } from 'src/movie/domain/entities/rate/value-objects/rate.calification'
import { VideogameNotFoundError } from '../../errors/videogame.not.found'
import { VideogameId } from 'src/videogame/domain/value-objects/id'
import { VideogameRepository } from '../../repositories/videogame.repository'

export class AddRateCommand
    implements
        ApplicationService<AddRateDTO, AddRateResponse, ApplicationError>
{
    constructor(
        private readonly videogameRepository: VideogameRepository,
        private readonly eventHandler: EventHandler,
    ) {}

    async execute(
        data: AddRateDTO,
    ): Promise<Result<AddRateResponse, ApplicationError>> {
        const videogame = await this.videogameRepository.getById(
            new VideogameId(data.id),
        )
        if (!videogame) return Result.error(new VideogameNotFoundError())
        const rate = new Rate(
            new RateId(data.profileId),
            new RateCalification(data.calification),
        )
        videogame.addRate(rate)
        await this.videogameRepository.save(videogame)
        this.eventHandler.publish(videogame.pullEvents())
        return Result.success({
            rateId: rate.id.value,
        })
    }
}
