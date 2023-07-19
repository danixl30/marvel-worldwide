import { ApplicationService } from '../../core/application/service/application-service'
import {
    GetOrganizationByIdResponse,
    OrganizationRepository,
} from '../../organization/applications/organization.repository'

export const getOrganizationByIdApplicationService = (
    organizationRepository: OrganizationRepository,
): ApplicationService<string, GetOrganizationByIdResponse> => {
    const execute = (id: string) => organizationRepository.getById(id)

    return {
        execute,
    }
}
