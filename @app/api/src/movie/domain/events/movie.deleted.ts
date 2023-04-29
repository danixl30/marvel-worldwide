import { DomainEvent } from 'src/core/domain/events/event'
import { MovieId } from '../value-objects/movie.id'

export class MovieDeletedEvent extends DomainEvent {
    constructor(private _id: MovieId) {
        super()
    }

    get id() {
        return this._id
    }
}
