import { Entity } from 'src/core/domain/entity/entity'
import { PowerDescription } from './value-objects/power.description'
import { PowerId } from './value-objects/power.id'
import { PowerName } from './value-objects/power.name'
import { PowerType } from './value-objects/power.type'

export class Power extends Entity<PowerId> {
    constructor(
        id: PowerId,
        private _name: PowerName,
        private _description: PowerDescription,
        private _type: PowerType,
    ) {
        super(id)
    }

    get name() {
        return this._name
    }

    get description() {
        return this._description
    }

    get type() {
        return this._type
    }

    changeName(name: PowerName) {
        this._name = name
    }

    changeDescription(description: PowerDescription) {
        this._description = description
    }

    changeType(type: PowerType) {
        this._type = type
    }
}
