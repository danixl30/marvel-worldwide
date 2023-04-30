import { ApplicationService } from 'src/core/application/service/application.service'
import { GetHeroesByCriteriaDTO } from './types/dto'
import { ApplicationError } from 'src/core/application/error/application.error'
import { HeroeRepository } from '../../repositories/heroe.repository'
import { SearchByCriteriaDTO } from 'src/civil/application/repositories/types/search.criteria.dto'
import { Result } from 'src/core/application/result-handler/result.handler'
import { GetHeroesByCriteriaResponse } from './types/response'

export class GetHeroesByCriteriaQuery
    implements
        ApplicationService<
            GetHeroesByCriteriaDTO,
            GetHeroesByCriteriaResponse,
            ApplicationError
        >
{
    constructor(private readonly heroeRepository: HeroeRepository) {}

    async execute(
        data: SearchByCriteriaDTO,
    ): Promise<Result<GetHeroesByCriteriaResponse, ApplicationError>> {
        const heroes = await this.heroeRepository.getByCriteria(data)
        return Result.success(
            heroes.map((e) => ({
                id: e.id.value,
                name: e.name.value,
                phrase: e.phrase.value,
            })),
        )
    }
}
