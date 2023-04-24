import { Optional } from '@mono/types-utils'
import { Repository } from 'src/core/application/repository/repository'
import { Actor } from 'src/movie/domain/entities/actor/actor'
import { ActorName } from 'src/movie/domain/entities/actor/value-objects/actor.name'
import { VideogameId } from 'src/videogame/domain/value-objects/id'
import { Videogame } from 'src/videogame/domain/videogame'

export interface VideogameRepository
    extends Repository<VideogameId, Videogame> {
    getActorByName(name: ActorName): Promise<Optional<Actor>>
}
