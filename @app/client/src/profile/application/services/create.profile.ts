import { ApplicationService } from '../../../core/application/service/application-service'
import { ProfileRepository } from '../profile.repository'
import { CreateProfileDTO } from './dto/create.profile'

export const createProfileService = (
    profileRepository: ProfileRepository,
): ApplicationService<CreateProfileDTO, void> => {
    const execute = (data: CreateProfileDTO) => profileRepository.create(data)

    return {
        execute,
    }
}
