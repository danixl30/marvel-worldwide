import { Optional } from '@mono/types-utils'
import { SearchByCriteriaDTO } from 'src/civil/application/repositories/types/search.criteria.dto'
import { Repository } from 'src/core/application/repository/repository'
import { Actor } from 'src/movie/domain/entities/actor/actor'
import { ActorName } from 'src/movie/domain/entities/actor/value-objects/actor.name'
import { Movie } from 'src/movie/domain/movie'
import { MovieId } from 'src/movie/domain/value-objects/movie.id'
import { MovieType } from 'src/movie/domain/value-objects/type'
import { ProfileId } from 'src/profile/domain/value-objects/profile.id'

export interface MovieRepository extends Repository<MovieId, Movie> {
    getActorByName(name: ActorName): Promise<Optional<Actor>>
    getByCriteria(criteria: SearchByCriteriaDTO): Promise<Movie[]>
    getByType(type: MovieType): Promise<Movie[]>
    getAtLeast2WeeksNearRelease(): Promise<Movie[]>
    getTrending(profileId: ProfileId): Promise<Movie[]>
}
