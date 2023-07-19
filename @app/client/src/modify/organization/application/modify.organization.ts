import { ApplicationService } from '../../../core/application/service/application-service'
import {
    ModifyOrganizationDTO,
    OrganizationRepository,
} from '../../../organization/applications/organization.repository'

export const modifyOrganizationApplicationService = (
    organizationRepository: OrganizationRepository,
): ApplicationService<ModifyOrganizationDTO, void> => {
    const execute = (data: ModifyOrganizationDTO) =>
        organizationRepository.modify(data)

    return {
        execute,
    }
}
