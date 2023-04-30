import { ApplicationService } from 'src/core/application/service/application.service'
import { GetSeriesThatHasMoreEpisodesThanAverageDTO } from './types/response'
import { ApplicationError } from 'src/core/application/error/application.error'
import { SerieRepository } from '../../repositories/serie.repository'
import { Result } from 'src/core/application/result-handler/result.handler'
import { GetSeriesByCriteriaResponse } from '../get-by-criteria/types/response'
import { filterSeriesByEpisodesGreaterthanAverage } from 'src/serie/domain/services/filter.episodes.greater.average'

export class GetSeriesThatHasMoreEpisodesThanAverageQuery
    implements
        ApplicationService<
            undefined,
            GetSeriesThatHasMoreEpisodesThanAverageDTO,
            ApplicationError
        >
{
    constructor(private readonly serieRepository: SerieRepository) {}

    async execute(): Promise<
        Result<GetSeriesByCriteriaResponse, ApplicationError>
    > {
        const series = await this.serieRepository.getAll()
        if (series.isEmpty()) return Result.success([])
        const seriesFiltered = filterSeriesByEpisodesGreaterthanAverage(series)
        return Result.success(
            seriesFiltered.map((e) => ({
                id: e.id.value,
                title: e.title.value,
                synopsis: e.synopsis.value,
                episodes: e.episodes.value,
                rating: e.rating,
            })),
        )
    }
}
