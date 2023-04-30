import { Optional } from '@mono/types-utils'
import { SearchByCriteriaDTO } from 'src/civil/application/repositories/types/search.criteria.dto'
import { Repository } from 'src/core/application/repository/repository'
import { Actor } from 'src/movie/domain/entities/actor/actor'
import { ActorName } from 'src/movie/domain/entities/actor/value-objects/actor.name'
import { Comic } from 'src/movie/domain/entities/comic/comic'
import { ComicId } from 'src/movie/domain/entities/comic/value-objects/id'
import { Movie } from 'src/movie/domain/movie'
import { MovieId } from 'src/movie/domain/value-objects/movie.id'

export interface MovieRepository extends Repository<MovieId, Movie> {
    getActorByName(name: ActorName): Promise<Optional<Actor>>
    getComicById(id: ComicId): Promise<Optional<Comic>>
    getByCriteria(criteria: SearchByCriteriaDTO): Promise<Movie[]>
}
