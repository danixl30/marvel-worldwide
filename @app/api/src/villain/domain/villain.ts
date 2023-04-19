import { AggregateRoot } from 'src/core/domain/aggregates/aggregate.root'
import { InvalidVillainException } from './exceptions/invalid.villain'
import { ObjectItem } from 'src/heroe/domain/entities/object/object'
import { Person } from 'src/heroe/domain/entities/person/person'
import { Power } from 'src/heroe/domain/entities/power/power'
import { VillainCreatedEvent } from './events/villain.created'
import { VillainId } from './value-object/villain.id'
import { VillainName } from './value-object/name'
import { VillainObjetive } from './value-object/objetive'

export class Villain extends AggregateRoot<VillainId> {
    constructor(
        id: VillainId,
        private _name: VillainName,
        private _person: Person,
        private _phrase: VillainObjetive,
        private _powers: Power[] = [],
        private _objects: ObjectItem[],
    ) {
        super(id)
        this.publish(
            new VillainCreatedEvent(
                id,
                this.name,
                this.person,
                this.phrase,
                this.powers,
                this.objects,
            ),
        )
    }

    get name() {
        return this._name
    }

    get person() {
        return this._person
    }

    get phrase() {
        return this._phrase
    }

    get powers() {
        return this._powers
    }

    get objects() {
        return this._objects
    }

    validateState(): void {
        if (!this.id || !this.name || !this.person || !this.phrase)
            throw new InvalidVillainException()
    }
}
