import { Entity } from 'src/core/domain/entity/entity'
import { HeadquarterId } from './value-objects/headquarter.id'
import { HeadquarterKind } from './value-objects/headquarter.kind'
import { HeadquarterName } from './value-objects/headquarter.name'
import { HeadquarterPlace } from './value-objects/headquarter.place'

export class Headquarter extends Entity<HeadquarterId> {
    constructor(
        id: HeadquarterId,
        private _name: HeadquarterName,
        private _kind: HeadquarterKind,
        private _place: HeadquarterPlace,
    ) {
        super(id)
    }

    get name() {
        return this._name
    }

    get kind() {
        return this._kind
    }

    get place() {
        return this._place
    }

    changeName(name: HeadquarterName) {
        this._name = name
    }

    changeKind(kind: HeadquarterKind) {
        this._kind = kind
    }

    changePlace(place: HeadquarterPlace) {
        this._place = place
    }
}
