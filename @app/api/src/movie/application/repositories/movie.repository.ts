import { Optional } from '@mono/types-utils'
import { Repository } from 'src/core/application/repository/repository'
import { Actor } from 'src/movie/domain/entities/actor/actor'
import { ActorName } from 'src/movie/domain/entities/actor/value-objects/actor.name'
import { Movie } from 'src/movie/domain/movie'
import { MovieId } from 'src/movie/domain/value-objects/movie.id'

export interface MovieRepository extends Repository<MovieId, Movie> {
    getActorByName(name: ActorName): Promise<Optional<Actor>>
}
