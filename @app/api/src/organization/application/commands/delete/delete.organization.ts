import { ApplicationService } from 'src/core/application/service/application.service'
import { DeleteOrganizationDTO } from './types/dto'
import { DeleteOrganizationResponse } from './types/response'
import { ApplicationError } from 'src/core/application/error/application.error'
import { OrganizationRepository } from '../../repositories/organization.repository'
import { EventHandler } from 'src/core/application/event-handler/event.handler'
import { Result } from 'src/core/application/result-handler/result.handler'
import { OrganizationId } from 'src/organization/domain/value-objects/organization.id'
import { OrganizationNotFoundError } from '../../errors/organization.not.found'

export class DeleteOrganizationCommand
    implements
        ApplicationService<
            DeleteOrganizationDTO,
            DeleteOrganizationResponse,
            ApplicationError
        >
{
    constructor(
        private readonly organizationRepository: OrganizationRepository,
        private readonly eventHandler: EventHandler,
    ) {}

    async execute(
        data: DeleteOrganizationDTO,
    ): Promise<Result<DeleteOrganizationResponse, ApplicationError>> {
        const organization = await this.organizationRepository.getById(
            new OrganizationId(data.id),
        )
        if (!organization) return Result.error(new OrganizationNotFoundError())
        organization.delete()
        await this.organizationRepository.delete(organization)
        this.eventHandler.publish(organization.pullEvents())
        return Result.success({
            id: data.id,
        })
    }
}
