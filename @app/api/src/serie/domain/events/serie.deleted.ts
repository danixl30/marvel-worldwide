import { DomainEvent } from 'src/core/domain/events/event'
import { SerieId } from '../value-objects/id'

export class SerieDeletedEvent extends DomainEvent {
    constructor(private _id: SerieId) {
        super()
    }

    get id() {
        return this._id
    }
}
