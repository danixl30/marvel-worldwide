import { ProfileId } from 'src/profile/domain/value-objects/profile.id'

export type SearchByCriteriaDTO = {
    profileId: ProfileId
    term: string
    pagination?: {
        page: number
        limit: number
    }
}
