import { ApplicationService } from 'src/core/application/service/application.service'
import { ApplicationError } from 'src/core/application/error/application.error'
import { Result } from 'src/core/application/result-handler/result.handler'
import { GetSeries2WResponse } from './types/response'
import { SerieRepository } from '../../repositories/serie.repository'

export class GetSeries2WQuery
    implements
        ApplicationService<undefined, GetSeries2WResponse, ApplicationError>
{
    constructor(private readonly serieRepository: SerieRepository) {}

    async execute(): Promise<Result<GetSeries2WResponse, ApplicationError>> {
        const series = await this.serieRepository.getAtLeast2WeeksNearRelease()
        return Result.success(
            series.map((e) => ({
                id: e.id.value,
                title: e.title.value,
                synopsis: e.synopsis.value,
                rating: e.rating,
                episodes: e.episodes.value,
            })),
        )
    }
}
