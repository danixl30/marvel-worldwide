import { Entity } from 'src/core/domain/entity/entity'
import { ObjectCreator } from './value-objects/object.creator'
import { ObjectDescription } from './value-objects/object.description'
import { ObjectId } from './value-objects/object.id'
import { ObjectKind } from './value-objects/object.kind'
import { ObjectMaterial } from './value-objects/object.material'
import { ObjectName } from './value-objects/object.name'

export class ObjectItem extends Entity<ObjectId> {
    constructor(
        id: ObjectId,
        private _name: ObjectName,
        private _description: ObjectDescription,
        private _kind: ObjectKind,
        private _material: ObjectMaterial,
        private _creator: ObjectCreator,
    ) {
        super(id)
    }

    get name() {
        return this._name
    }

    get description() {
        return this._description
    }

    get kind() {
        return this._kind
    }

    get material() {
        return this._material
    }

    get creator() {
        return this._creator
    }
}
