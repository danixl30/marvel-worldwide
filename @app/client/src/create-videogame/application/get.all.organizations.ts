import { ApplicationService } from '../../core/application/service/application-service'
import {
    OrganizationList,
    OrganizationRepository,
} from '../../organization/applications/organization.repository'

export const getAllOrganizationsApplicationService = (
    organizationRepository: OrganizationRepository,
): ApplicationService<undefined, OrganizationList[]> => {
    const execute = () => organizationRepository.getAll()

    return {
        execute,
    }
}
