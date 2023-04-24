import { Repository } from 'src/core/application/repository/repository'
import { History } from 'src/profile/domain/entities/history/history'
import { Profile } from 'src/profile/domain/profile'
import { ProfileId } from 'src/profile/domain/value-objects/profile.id'

export interface ProfileRepository extends Repository<ProfileId, Profile> {
    getProfileHistory(id: ProfileId): Promise<History[]>
}
