import { ApplicationService } from '../../core/application/service/application-service'
import { ProfileRepository } from '../../profile/application/profile.repository'

export const endHistoryApplicationService = (
    profileRepository: ProfileRepository,
): ApplicationService<string, void> => {
    const execute = (id: string) => profileRepository.endHistory(id)

    return {
        execute,
    }
}
