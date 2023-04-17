import { AggregateRoot } from 'src/core/domain/aggregates/aggregate.root'
import { CivilId } from './value-objects/id'
import { Person } from 'src/heroe/domain/entities/person/person'

export class Civil extends AggregateRoot<CivilId> {
    constructor(id: CivilId, private _person: Person) {
        super(id)
    }

    get person() {
        return this._person
    }

    validateState(): void {}
}
