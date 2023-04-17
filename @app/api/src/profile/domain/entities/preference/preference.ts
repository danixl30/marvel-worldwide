import { Entity } from 'src/core/domain/entity/entity'
import { PreferenceId } from './value-objects/id'
import { PreferencePoints } from './value-objects/points'
import { PreferenceTarget } from './value-objects/target'

export class Preference extends Entity<PreferenceId> {
    constructor(
        id: PreferenceId,
        private readonly _target: PreferenceTarget,
        private readonly _points: PreferencePoints,
    ) {
        super(id)
    }

    get target() {
        return this._target
    }

    get points() {
        return this._points
    }
}
