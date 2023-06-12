import { DomainEvent } from 'src/core/domain/events/event'
import { Enemy } from '../value-object/heroe.enemy'
import { EnemyGroup } from '../value-object/heroe.group.enemy'
import { ObjectItem } from 'src/heroe/domain/entities/object/object'
import { Person } from 'src/heroe/domain/entities/person/person'
import { Power } from 'src/heroe/domain/entities/power/power'
import { VillainId } from '../value-object/villain.id'
import { VillainName } from '../value-object/name'
import { VillainObjetive } from '../value-object/objetive'
import { Logo } from 'src/heroe/domain/value-object/logo'

export class VillainCreatedEvent extends DomainEvent {
    constructor(
        private _id: VillainId,
        private _name: VillainName,
        private _person: Person,
        private _objective: VillainObjetive,
        private _logo: Logo,
        private _enemies: Enemy[] = [],
        private _enemieGroups: EnemyGroup[] = [],
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

    get objetive() {
        return this._objective
    }

    get logo() {
        return this._logo
    }

    get enemies() {
        return this._enemies
    }

    get enemieGroups() {
        return this._enemieGroups
    }

    get powers() {
        return this._powers
    }

    get objects() {
        return this._objects
    }
}
