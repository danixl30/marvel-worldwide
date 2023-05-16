import { Optional } from '@mono/types-utils'
import { SearchByCriteriaDTO } from 'src/civil/application/repositories/types/search.criteria.dto'
import { Repository } from 'src/core/application/repository/repository'
import { Actor } from 'src/movie/domain/entities/actor/actor'
import { ActorName } from 'src/movie/domain/entities/actor/value-objects/actor.name'
import { Comic } from 'src/movie/domain/entities/comic/comic'
import { ComicId } from 'src/movie/domain/entities/comic/value-objects/id'
import { ProfileId } from 'src/profile/domain/value-objects/profile.id'
import { VideogameId } from 'src/videogame/domain/value-objects/id'
import { Videogame } from 'src/videogame/domain/videogame'

export interface VideogameRepository
    extends Repository<VideogameId, Videogame> {
    getActorByName(name: ActorName): Promise<Optional<Actor>>
    getComicById(id: ComicId): Promise<Optional<Comic>>
    getByCriteria(criteria: SearchByCriteriaDTO): Promise<Videogame[]>
    getAtLeast2WeeksNearRelease(): Promise<Videogame[]>
    getTrending(profileId: ProfileId): Promise<Videogame[]>
}
