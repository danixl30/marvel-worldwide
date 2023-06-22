import { ApplicationService } from 'src/core/application/service/application.service'
import { ApplicationError } from 'src/core/application/error/application.error'
import { OrganizationRepository } from '../../repositories/organization.repository'
import { Result } from 'src/core/application/result-handler/result.handler'
import { GetAllHeadquarters } from './types/response'

export class GetAllHeadquartersQuery
    implements
        ApplicationService<undefined, GetAllHeadquarters, ApplicationError>
{
    constructor(
        private readonly organizationRepository: OrganizationRepository,
    ) {}

    async execute(): Promise<Result<GetAllHeadquarters, ApplicationError>> {
        const headquarters =
            await this.organizationRepository.getAllHeadquarters()
        return Result.success(
            headquarters.map((e) => ({
                id: e.id.value,
                name: e.name.value,
            })),
        )
    }
}
