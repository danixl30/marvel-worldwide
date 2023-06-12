import { CreateProfileDTO } from './services/dto/create.profile'
import { Profile } from './services/dto/profile'
import { GetProfilesResponse } from './services/dto/profile.list'

export type ProfileRepository = {
    create(data: CreateProfileDTO): Promise<void>
    getProfiles(): Promise<GetProfilesResponse>
    getDetails(): Promise<Profile>
}
