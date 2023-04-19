import { DomainEvent } from 'src/core/domain/events/event'
import { History } from '../entities/history/history'
import { ProfileId } from '../value-objects/profile.id'

export class HistoryEndedEvent extends DomainEvent {
    constructor(private _id: ProfileId, private _history: History) {
        super()
    }

    get id() {
        return this._id
    }

    get history() {
        return this._history
    }
}
