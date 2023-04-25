import { Entity } from 'src/core/domain/entity/entity'
import { PreferenceId } from './value-objects/id'
import { PreferenceTarget } from './value-objects/target'

export class Preference extends Entity<PreferenceId> {
    constructor(id: PreferenceId, private readonly _target: PreferenceTarget) {
        super(id)
    }

    get target() {
        return this._target
    }
}
