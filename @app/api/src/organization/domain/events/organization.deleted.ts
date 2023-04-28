import { DomainEvent } from 'src/core/domain/events/event'
import { OrganizationId } from '../value-objects/organization.id'

export class OrganizationDeletedEvent extends DomainEvent {
    constructor(private _id: OrganizationId) {
        super()
    }

    get id() {
        return this._id
    }
}
