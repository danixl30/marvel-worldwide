import { DomainEvent } from 'src/core/domain/events/event'
import { CombatId } from '../value-objects/id'

export class CombatDeletedEvent extends DomainEvent {
    constructor(private _id: CombatId) {
        super()
    }

    get id() {
        return this._id
    }
}
