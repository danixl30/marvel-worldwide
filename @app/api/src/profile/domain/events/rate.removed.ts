import { DomainEvent } from 'src/core/domain/events/event'
import { ProfileId } from '../value-objects/profile.id'
import { Rate } from '../entities/rate/rate'

export class ProfileRateRemovedEvent extends DomainEvent {
    constructor(private _id: ProfileId, private _rate: Rate) {
        super()
    }

    get id() {
        return this._id
    }
    get rate() {
        return this._rate
    }
}
