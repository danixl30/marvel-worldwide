import { ApplicationService } from '../../core/application/service/application-service'
import { ProfileRepository } from '../../profile/application/profile.repository'
import { GetTop5ContentPremiumVIPResponse } from '../../profile/application/services/dto/top5.content'

export const getTop5ContentApplicationService = (
    profileRepository: ProfileRepository,
): ApplicationService<undefined, GetTop5ContentPremiumVIPResponse> => {
    const execute = () => profileRepository.getTop5Content()

    return {
        execute,
    }
}
