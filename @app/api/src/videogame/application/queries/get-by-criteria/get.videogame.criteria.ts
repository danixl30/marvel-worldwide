import { ApplicationService } from 'src/core/application/service/application.service'
import { GetVideogamesByCriterioDTO } from './types/dto'
import { GetVideogamesByCriterioResponse } from './types/response'
import { ApplicationError } from 'src/core/application/error/application.error'
import { VideogameRepository } from '../../repositories/videogame.repository'
import { SearchByCriteriaDTO } from 'src/civil/application/repositories/types/search.criteria.dto'
import { Result } from 'src/core/application/result-handler/result.handler'

export class GetVideogamesByCriterioQuery
    implements
        ApplicationService<
            GetVideogamesByCriterioDTO,
            GetVideogamesByCriterioResponse,
            ApplicationError
        >
{
    constructor(private readonly videogameRepository: VideogameRepository) {}

    async execute(
        data: SearchByCriteriaDTO,
    ): Promise<Result<GetVideogamesByCriterioResponse, ApplicationError>> {
        const videogames = await this.videogameRepository.getByCriteria(data)
        return Result.success(
            videogames.map((e) => ({
                id: e.id.value,
                title: e.title.value,
                synopsis: e.synopsis.value,
                platforms: e.platforms.map((e) => e.value),
                rating: e.rating,
            })),
        )
    }
}
