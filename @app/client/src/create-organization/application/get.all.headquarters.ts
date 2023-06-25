import { ApplicationService } from '../../core/application/service/application-service'
import {
    HeadquarterList,
    OrganizationRepository,
} from '../../organization/applications/organization.repository'

export const getAllHeadquartersApplicationService = (
    organizationRepository: OrganizationRepository,
): ApplicationService<undefined, HeadquarterList[]> => {
    const execute = () => organizationRepository.getAllHeadquarters()

    return {
        execute,
    }
}
