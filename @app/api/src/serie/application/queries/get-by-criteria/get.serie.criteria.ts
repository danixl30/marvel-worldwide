import { ApplicationService } from 'src/core/application/service/application.service'
import { GetSeriesByCriteriaDTO } from './types/dto'
import { GetSeriesByCriteriaResponse } from './types/response'
import { ApplicationError } from 'src/core/application/error/application.error'
import { SerieRepository } from '../../repositories/serie.repository'
import { SearchByCriteriaDTO } from 'src/civil/application/repositories/types/search.criteria.dto'
import { Result } from 'src/core/application/result-handler/result.handler'

export class GetSeriesByCriteriaQuery
    implements
        ApplicationService<
            GetSeriesByCriteriaDTO,
            GetSeriesByCriteriaResponse,
            ApplicationError
        >
{
    constructor(private readonly serieRepository: SerieRepository) {}

    async execute(
        data: SearchByCriteriaDTO,
    ): Promise<Result<GetSeriesByCriteriaResponse, ApplicationError>> {
        const series = await this.serieRepository.getByCriteria(data)
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
