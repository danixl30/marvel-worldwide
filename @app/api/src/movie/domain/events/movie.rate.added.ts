import { DomainEvent } from 'src/core/domain/events/event'
import { Rate } from 'src/movie/domain/entities/rate/rate'
import { MovieId } from '../value-objects/movie.id'

export class MovieRateAddedEvent extends DomainEvent {
    constructor(private _id: MovieId, private _rate: Rate) {
        super()
    }

    get id() {
        return this._id
    }

    get rate() {
        return this._rate
    }
}
