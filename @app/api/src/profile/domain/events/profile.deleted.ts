import { DomainEvent } from 'src/core/domain/events/event'
import { ProfileId } from '../value-objects/profile.id'

export class ProfileDeletedEvent extends DomainEvent {
    constructor(private _id: ProfileId) {
        super()
    }

    get id() {
        return this._id
    }
}
