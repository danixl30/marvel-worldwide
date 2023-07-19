import { ApplicationService } from '../../core/application/service/application-service'
import { ProfileRepository } from '../../profile/application/profile.repository'
import { RateItemDTO } from '../../profile/application/services/dto/rate.item'

export const rateSerieApplicationService = (
    profileRepository: ProfileRepository,
): ApplicationService<Omit<RateItemDTO, 'kind'>, void> => {
    const execute = (data: Omit<RateItemDTO, 'kind'>) =>
        profileRepository.rate({
            ...data,
            kind: 'serie',
        })

    return {
        execute,
    }
}
