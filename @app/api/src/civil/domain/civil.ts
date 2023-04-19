import { AggregateRoot } from 'src/core/domain/aggregates/aggregate.root'
import { CivilCreatedEvent } from './events/civil.created'
import { CivilId } from './value-objects/id'
import { CivilRelationship } from './value-objects/relationship'
import { InvalidCivilException } from './exceptions/invalid.civil'
import { Person } from 'src/heroe/domain/entities/person/person'

export class Civil extends AggregateRoot<CivilId> {
    constructor(
        id: CivilId,
        private _person: Person,
        private _relation: CivilRelationship,
    ) {
        super(id)
        this.publish(new CivilCreatedEvent(id, this.person, this.relation))
    }

    get person() {
        return this._person
    }

    get relation() {
        return this._relation
    }

    validateState(): void {
        if (!this.id || !this.person || !this.relation)
            throw new InvalidCivilException()
    }
}
