import { ApplicationService } from 'src/core/application/service/application.service'
import { AddRateDTO } from './types/dto'
import { AddRateResponse } from './types/response'
import { ApplicationError } from 'src/core/application/error/application.error'
import { Result } from 'src/core/application/result-handler/result.handler'
import { EventHandler } from 'src/core/application/event-handler/event.handler'
import { MovieRepository } from '../../repositories/movie.repository'
import { MovieId } from 'src/movie/domain/value-objects/movie.id'
import { MovieNotFoundError } from '../../errors/movie.not.found'
import { Rate } from 'src/movie/domain/entities/rate/rate'
import { RateId } from 'src/movie/domain/entities/rate/value-objects/rate.id'
import { RateCalification } from 'src/movie/domain/entities/rate/value-objects/rate.calification'

export class AddRateCommand
    implements
        ApplicationService<AddRateDTO, AddRateResponse, ApplicationError>
{
    constructor(
        private readonly movieRepository: MovieRepository,
        private readonly eventHandler: EventHandler,
    ) {}

    async execute(
        data: AddRateDTO,
    ): Promise<Result<AddRateResponse, ApplicationError>> {
        const movie = await this.movieRepository.getById(new MovieId(data.id))
        if (!movie) return Result.error(new MovieNotFoundError())
        const rate = new Rate(
            new RateId(data.profileId),
            new RateCalification(data.calification),
        )
        movie.addRate(rate)
        await this.movieRepository.save(movie)
        this.eventHandler.publish(movie.pullEvents())
        return Result.success({
            rateId: rate.id.value,
        })
    }
}
