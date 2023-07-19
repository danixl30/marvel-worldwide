import { Optional } from '@mono/types-utils'
import { SearchByCriteriaDTO } from 'src/civil/application/repositories/types/search.criteria.dto'
import { Repository } from 'src/core/application/repository/repository'
import { Actor } from 'src/movie/domain/entities/actor/actor'
import { ActorName } from 'src/movie/domain/entities/actor/value-objects/actor.name'
import { ProfileId } from 'src/profile/domain/value-objects/profile.id'
import { VideogameId } from 'src/videogame/domain/value-objects/id'
import { Videogame } from 'src/videogame/domain/videogame'

export interface VideogameRepository
    extends Repository<VideogameId, Videogame> {
    getActorByName(name: ActorName): Promise<Optional<Actor>>
    getByCriteria(criteria: SearchByCriteriaDTO): Promise<Videogame[]>
    getAtLeast2WeeksNearRelease(): Promise<Videogame[]>
    getTrending(profileId: ProfileId): Promise<Videogame[]>
    getTop10History(profileId: ProfileId): Promise<Videogame[]>
}
