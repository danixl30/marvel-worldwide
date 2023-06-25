import { ApplicationService } from '../../core/application/service/application-service'
import {
    CreateOrganizationDTO,
    OrganizationRepository,
} from '../../organization/applications/organization.repository'

export const createOrganizationApplicationService = (
    organizationRepository: OrganizationRepository,
): ApplicationService<CreateOrganizationDTO, void> => {
    const execute = (data: CreateOrganizationDTO) =>
        organizationRepository.create(data)

    return {
        execute,
    }
}
