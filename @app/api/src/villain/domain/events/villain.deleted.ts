import { DomainEvent } from 'src/core/domain/events/event'
import { VillainId } from '../value-object/villain.id'

export class VillainDeletedEvent extends DomainEvent {
    constructor(private _id: VillainId) {
        super()
    }

    get id() {
        return this._id
    }
}
