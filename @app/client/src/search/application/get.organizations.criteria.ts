import { GetByCriteriaDTO } from '../../civil/application/repositories/civil.repository'
import { ApplicationService } from '../../core/application/service/application-service'
import {
    GetOrganizationsByCriteriaResponse,
    OrganizationRepository,
} from '../../organization/applications/organization.repository'

export const getOrganizationsByCriteriaApplicationService = (
    organizationRepository: OrganizationRepository,
): ApplicationService<GetByCriteriaDTO, GetOrganizationsByCriteriaResponse> => {
    const execute = (data: GetByCriteriaDTO) =>
        organizationRepository.getByCriteria(data)

    return {
        execute,
    }
}
