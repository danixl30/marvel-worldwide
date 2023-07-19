import { CreateProfileDTO } from './services/dto/create.profile'
import { Profile } from './services/dto/profile'
import { GetProfilesResponse } from './services/dto/profile.list'
import { RateItemDTO } from './services/dto/rate.item'
import { GetTop5ContentPremiumVIPResponse } from './services/dto/top5.content'

export type ProfileRepository = {
    create(data: CreateProfileDTO): Promise<void>
    getProfiles(): Promise<GetProfilesResponse>
    getDetails(): Promise<Profile>
    getTop5Content(): Promise<GetTop5ContentPremiumVIPResponse>
    rate(dto: RateItemDTO): Promise<void>
    endHistory(historyId: string): Promise<void>
}
