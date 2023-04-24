import { Optional } from '@mono/types-utils'
import { Repository } from 'src/core/application/repository/repository'
import { Actor } from 'src/movie/domain/entities/actor/actor'
import { ActorName } from 'src/movie/domain/entities/actor/value-objects/actor.name'
import { Serie } from 'src/serie/domain/serie'
import { SerieId } from 'src/serie/domain/value-objects/id'

export interface SerieRepository extends Repository<SerieId, Serie> {
    getActorByName(name: ActorName): Promise<Optional<Actor>>
}
