import { MediaType } from 'src/profile/domain/entities/preference/value-objects/target'

export type CreateProfileDTO = {
    email: string
    userId: string
    language: string
    preferences: {
        kind: string
        platform: MediaType
    }[]
}
