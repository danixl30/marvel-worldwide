import { Optional } from '@mono/types-utils'
import { SearchByCriteriaDTO } from 'src/civil/application/repositories/types/search.criteria.dto'
import { Repository } from 'src/core/application/repository/repository'
import { Actor } from 'src/movie/domain/entities/actor/actor'
import { ActorName } from 'src/movie/domain/entities/actor/value-objects/actor.name'
import { Comic } from 'src/movie/domain/entities/comic/comic'
import { ComicId } from 'src/movie/domain/entities/comic/value-objects/id'
import { ProfileId } from 'src/profile/domain/value-objects/profile.id'
import { Serie } from 'src/serie/domain/serie'
import { SerieId } from 'src/serie/domain/value-objects/id'

export interface SerieRepository extends Repository<SerieId, Serie> {
    getActorByName(name: ActorName): Promise<Optional<Actor>>
    getComicById(id: ComicId): Promise<Optional<Comic>>
    getByCriteria(criteria: SearchByCriteriaDTO): Promise<Serie[]>
    getAll(): Promise<Serie[]>
    getAtLeast2WeeksNearRelease(): Promise<Serie[]>
    getTrending(profileId: ProfileId): Promise<Serie[]>
}
