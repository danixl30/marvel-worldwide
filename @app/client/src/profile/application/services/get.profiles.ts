import { ApplicationService } from '../../../core/application/service/application-service'
import { ProfileRepository } from '../profile.repository'
import { GetProfilesResponse } from './dto/profile.list'

export const getProfilesService = (
    profileRepository: ProfileRepository,
): ApplicationService<undefined, GetProfilesResponse> => {
    const execute = () => profileRepository.getProfiles()

    return {
        execute,
    }
}
