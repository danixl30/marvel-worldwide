import { ApplicationService } from 'src/core/application/service/application.service'
import { GetSeriesTop10HistoryDTO } from './types/dto'
import { GetSeriesTop10HistoryResponse } from './types/response'
import { SerieRepository } from '../../repositories/serie.repository'
import { Result } from 'src/core/application/result-handler/result.handler'
import { GetSeriesByCriteriaResponse } from '../get-by-criteria/types/response'
import { ProfileId } from 'src/profile/domain/value-objects/profile.id'
import { ApplicationError } from 'src/core/application/error/application.error'

export class GetSeriesTop10HistoryQuery
    implements
        ApplicationService<
            GetSeriesTop10HistoryDTO,
            GetSeriesTop10HistoryResponse,
            ApplicationError
        >
{
    constructor(private serieRepository: SerieRepository) {}

    async execute(
        data: GetSeriesTop10HistoryDTO,
    ): Promise<Result<GetSeriesByCriteriaResponse, any>> {
        const series = await this.serieRepository.getTop10History(
            new ProfileId(data.profileId),
        )
        return Result.success(
            series.map((e) => ({
                id: e.id.value,
                title: e.title.value,
                synopsis: e.synopsis.value,
                episodes: e.episodes.value,
                rating: e.rating,
            })),
        )
    }
}
