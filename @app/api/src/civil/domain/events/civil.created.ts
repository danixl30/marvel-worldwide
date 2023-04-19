import { CivilId } from '../value-objects/id'
import { CivilRelationship } from '../value-objects/relationship'
import { DomainEvent } from 'src/core/domain/events/event'
import { Person } from 'src/heroe/domain/entities/person/person'

export class CivilCreatedEvent extends DomainEvent {
    constructor(
        private _id: CivilId,
        private _person: Person,
        private _relation: CivilRelationship,
    ) {
        super()
    }

    get id() {
        return this._id
    }

    get person() {
        return this._person
    }

    get relation() {
        return this._relation
    }
}
