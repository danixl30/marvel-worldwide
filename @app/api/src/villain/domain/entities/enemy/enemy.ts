import { EnemyId } from './value-objects/id'
import { EnemyName } from './value-objects/name'
import { Entity } from 'src/core/domain/entity/entity'

export class Enemy extends Entity<EnemyId> {
    constructor(id: EnemyId, private _name: EnemyName) {
        super(id)
    }

    get name() {
        return this._name
    }
}
