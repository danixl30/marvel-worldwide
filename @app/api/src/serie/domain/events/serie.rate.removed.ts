import { DomainEvent } from 'src/core/domain/events/event'
import { Rate } from 'src/movie/domain/entities/rate/rate'
import { SerieId } from '../value-objects/id'

export class SerieRateRemovedEvent extends DomainEvent {
    constructor(private _id: SerieId, private _rate: Rate) {
        super()
    }

    get id() {
        return this._id
    }

    get rate() {
        return this._rate
    }
}
