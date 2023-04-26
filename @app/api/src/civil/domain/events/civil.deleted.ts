import { CivilId } from '../value-objects/id'
import { DomainEvent } from 'src/core/domain/events/event'

export class CivilDeletedEvent extends DomainEvent {
    constructor(private _id: CivilId) {
        super()
    }

    get id() {
        return this._id
    }
}
