import { Entity } from 'src/core/domain/entity/entity'
import { PowerId } from './value-objects/power.id'

export class Power extends Entity<PowerId> {
    constructor(
        id: PowerId,
        private _name: string,
        private _description: string,
    ) {
        super(id)
    }

    get name() {
        return this._name
    }

    get description() {
        return this._description
    }
}
