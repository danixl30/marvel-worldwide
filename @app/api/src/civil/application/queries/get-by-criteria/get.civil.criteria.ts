import { ApplicationService } from 'src/core/application/service/application.service'
import { GetCivilsByCriteriaDTO } from './types/dto'
import { GetCivilsByCriteriaResponse } from './types/response'
import { ApplicationError } from 'src/core/application/error/application.error'
import { CivilRepository } from '../../repositories/civil.repository'
import { Result } from 'src/core/application/result-handler/result.handler'
import { SearchByCriteriaDTO } from '../../repositories/types/search.criteria.dto'

export class GetCivilsByCriteriaQuery
    implements
        ApplicationService<
            GetCivilsByCriteriaDTO,
            GetCivilsByCriteriaResponse,
            ApplicationError
        >
{
    constructor(private readonly civilRepository: CivilRepository) {}

    async execute(
        data: SearchByCriteriaDTO,
    ): Promise<Result<GetCivilsByCriteriaResponse, ApplicationError>> {
        const civils = await this.civilRepository.getByCriteria(data)
        return Result.success(
            civils.map((e) => ({
                id: e.id.value,
                name: e.person.name,
            })),
        )
    }
}
