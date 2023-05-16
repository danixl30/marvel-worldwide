import { ApplicationService } from 'src/core/application/service/application.service'
import { GetSeriesTrendigDTO } from './types/dto'
import { GetSeriesTrendigResponse } from './types/response'
import { ApplicationError } from 'src/core/application/error/application.error'
import { SerieRepository } from '../../repositories/serie.repository'
import { Result } from 'src/core/application/result-handler/result.handler'
import { GetSeriesByCriteriaResponse } from '../get-by-criteria/types/response'
import { ProfileId } from 'src/profile/domain/value-objects/profile.id'

export class GetSeriesTrendigQuery
    implements
        ApplicationService<
            GetSeriesTrendigDTO,
            GetSeriesTrendigResponse,
            ApplicationError
        >
{
    constructor(private readonly serieRepository: SerieRepository) {}

    async execute(
        data: GetSeriesTrendigDTO,
    ): Promise<Result<GetSeriesByCriteriaResponse, ApplicationError>> {
        const series = await this.serieRepository.getTrending(
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
