import { DomainEvent } from 'src/core/domain/events/event'
import { VideogameId } from '../value-objects/id'

export class VideogameDeletedEvent extends DomainEvent {
    constructor(private _id: VideogameId) {
        super()
    }

    get id() {
        return this._id
    }
}
