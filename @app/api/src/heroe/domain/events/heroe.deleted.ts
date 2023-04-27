import { DomainEvent } from 'src/core/domain/events/event'
import { HeroeId } from '../value-object/heroe.id'

export class HeroeDeletedEvent extends DomainEvent {
    constructor(private _id: HeroeId) {
        super()
    }

    get id() {
        return this._id
    }
}
