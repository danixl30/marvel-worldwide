import { DomainEvent } from 'src/core/domain/events/event'
import { HeroeCreator } from '../value-object/creator'
import { HeroeId } from '../value-object/heroe.id'
import { HeroeName } from '../value-object/name'
import { HeroePhrase } from '../value-object/phrase'
import { ObjectItem } from '../entities/object/object'
import { Person } from '../entities/person/person'
import { Power } from '../entities/power/power'

export class HeroeCreatedEvent extends DomainEvent {
    constructor(
        private _id: HeroeId,
        private _name: HeroeName,
        private _person: Person,
        private _phrase: HeroePhrase,
        private _creator: HeroeCreator,
        private _powers: Power[] = [],
        private _objects: ObjectItem[],
    ) {
        super()
    }

    get id() {
        return this._id
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
}
