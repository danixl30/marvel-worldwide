import { ApplicationService } from 'src/core/application/service/application.service'
import { GetOrganizationsByCriteriaDTO } from './types/dto'
import { GetOrganizationsByCriteriaResponse } from './types/response'
import { ApplicationError } from 'src/core/application/error/application.error'
import { OrganizationRepository } from '../../repositories/organization.repository'
import { SearchByCriteriaDTO } from 'src/civil/application/repositories/types/search.criteria.dto'
import { Result } from 'src/core/application/result-handler/result.handler'

export class GetOrganizationsByCriteriaQuery
    implements
        ApplicationService<
            GetOrganizationsByCriteriaDTO,
            GetOrganizationsByCriteriaResponse,
            ApplicationError
        >
{
    constructor(
        private readonly organizationRepository: OrganizationRepository,
    ) {}

    async execute(
        data: SearchByCriteriaDTO,
    ): Promise<Result<GetOrganizationsByCriteriaResponse, ApplicationError>> {
        const organizations = await this.organizationRepository.getByCriteria(
            data,
        )
        return Result.success(
            organizations.map((e) => ({
                id: e.id.value,
                name: e.name.value,
                objetive: e.objetive.value,
            })),
        )
    }
}
