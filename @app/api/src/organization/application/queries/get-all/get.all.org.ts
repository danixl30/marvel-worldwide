import { ApplicationService } from 'src/core/application/service/application.service'
import { ApplicationError } from 'src/core/application/error/application.error'
import { OrganizationRepository } from '../../repositories/organization.repository'
import { Result } from 'src/core/application/result-handler/result.handler'
import { GetAllOrgs } from './types/response'

export class GetAllOrganizationsQuery
    implements ApplicationService<undefined, GetAllOrgs, ApplicationError>
{
    constructor(
        private readonly organizationRepository: OrganizationRepository,
    ) {}

    async execute(): Promise<Result<GetAllOrgs, ApplicationError>> {
        const organizations = await this.organizationRepository.getAll()
        return Result.success(
            organizations.map((e) => ({
                id: e.id.value,
                name: e.name.value,
            })),
        )
    }
}
