import { ApplicationService } from 'src/core/application/service/application.service'
import { AddRateDTO } from './types/dto'
import { AddRateResponse } from './types/response'
import { ApplicationError } from 'src/core/application/error/application.error'
import { Result } from 'src/core/application/result-handler/result.handler'
import { EventHandler } from 'src/core/application/event-handler/event.handler'
import { Rate } from 'src/movie/domain/entities/rate/rate'
import { RateId } from 'src/movie/domain/entities/rate/value-objects/rate.id'
import { RateCalification } from 'src/movie/domain/entities/rate/value-objects/rate.calification'
import { SerieRepository } from '../../repositories/serie.repository'
import { SerieNotFoundError } from '../../errors/serie.not.found'
import { SerieId } from 'src/serie/domain/value-objects/id'

export class AddRateCommand
    implements
        ApplicationService<AddRateDTO, AddRateResponse, ApplicationError>
{
    constructor(
        private readonly serieRepository: SerieRepository,
        private readonly eventHandler: EventHandler,
    ) {}

    async execute(
        data: AddRateDTO,
    ): Promise<Result<AddRateResponse, ApplicationError>> {
        const serie = await this.serieRepository.getById(new SerieId(data.id))
        if (!serie) return Result.error(new SerieNotFoundError())
        const rate = new Rate(
            new RateId(data.profileId),
            new RateCalification(data.calification),
        )
        serie.addRate(rate)
        await this.serieRepository.save(serie)
        this.eventHandler.publish(serie.pullEvents())
        return Result.success({
            rateId: rate.id.value,
        })
    }
}
