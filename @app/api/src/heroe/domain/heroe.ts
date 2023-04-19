import { AggregateRoot } from 'src/core/domain/aggregates/aggregate.root'
import { HeroeCreator } from './value-object/creator'
import { HeroeId } from './value-object/heroe.id'
import { HeroeName } from './value-object/name'
import { HeroePhrase } from './value-object/phrase'
import { InvalidHeroeException } from './exceptions/invalid.heroe'
import { ObjectItem } from './entities/object/object'
import { Person } from './entities/person/person'
import { Power } from './entities/power/power'

export class Heroe extends AggregateRoot<HeroeId> {
    constructor(
        id: HeroeId,
        private _name: HeroeName,
        private _person: Person,
        private _phrase: HeroePhrase,
        private _creator: HeroeCreator,
        private _powers: Power[] = [],
        private _objects: ObjectItem[],
    ) {
        super(id)
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

    get creator() {
        return this._creator
    }

    get powers() {
        return this._powers
    }

    get objects() {
        return this._objects
    }

    validateState(): void {
        if (
            !this.id ||
            !this.name ||
            !this.person ||
            !this.phrase ||
            !this.creator ||
            !this.powers ||
            !this.objects
        )
            throw new InvalidHeroeException()
    }
}
