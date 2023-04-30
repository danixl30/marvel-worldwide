import { DomainEvent } from 'src/core/domain/events/event'
import { VideogameId } from '../value-objects/id'
import { Rate } from 'src/movie/domain/entities/rate/rate'

export class VideogameRateAddedEvent extends DomainEvent {
    constructor(private _id: VideogameId, private _rate: Rate) {
        super()
    }

    get id() {
        return this._id
    }

    get rate() {
        return this._rate
    }
}
