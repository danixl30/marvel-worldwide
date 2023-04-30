import { ApplicationService } from 'src/core/application/service/application.service'
import { GetVillainsByCriteriaDTO } from './types/dto'
import { GetVillainsByCriteriaResponse } from './types/response'
import { ApplicationError } from 'src/core/application/error/application.error'
import { VillainRepository } from '../../repositories/villain.repository'
import { SearchByCriteriaDTO } from 'src/civil/application/repositories/types/search.criteria.dto'
import { Result } from 'src/core/application/result-handler/result.handler'

export class GetVillainsByCriteriaQuery
    implements
        ApplicationService<
            GetVillainsByCriteriaDTO,
            GetVillainsByCriteriaResponse,
            ApplicationError
        >
{
    constructor(private readonly villainRepository: VillainRepository) {}

    async execute(
        data: SearchByCriteriaDTO,
    ): Promise<Result<GetVillainsByCriteriaResponse, ApplicationError>> {
        const villains = await this.villainRepository.getByCriteria(data)
        return Result.success(
            villains.map((e) => ({
                id: e.id.value,
                name: e.name.value,
                objetive: e.objetive.value,
            })),
        )
    }
}
