import { ArchEnemy } from '../value-object/arch.enemy'
import { DomainEvent } from 'src/core/domain/events/event'
import { HeroeCreator } from '../value-object/creator'
import { HeroeId } from '../value-object/heroe.id'
import { HeroeName } from '../value-object/name'
import { ObjectItem } from '../entities/object/object'
import { Person } from '../entities/person/person'
import { Power } from '../entities/power/power'
import { Logo } from '../value-object/logo'
import { SuitColor } from '../value-object/suit.color'

export class HeroeCreatedEvent extends DomainEvent {
    constructor(
        private _id: HeroeId,
        private _name: HeroeName,
        private _person: Person,
        private _logo: Logo,
        private _creator: HeroeCreator,
        private _archEnemy: ArchEnemy,
        private _colors: SuitColor[] = [],
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

    get logo() {
        return this._logo
    }

    get colors() {
        return this._colors
    }

    get creator() {
        return this._creator
    }

    get archEnemy() {
        return this._archEnemy
    }

    get powers() {
        return this._powers
    }

    get objects() {
        return this._objects
    }
}
