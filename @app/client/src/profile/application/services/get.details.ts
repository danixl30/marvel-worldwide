import { ApplicationService } from '../../../core/application/service/application-service'
import { ProfileRepository } from '../profile.repository'
import { Profile } from './dto/profile'

export const getProfileDetails = (
    profileRepository: ProfileRepository,
): ApplicationService<undefined, Profile> => {
    const execute = () => profileRepository.getDetails()

    return {
        execute,
    }
}
