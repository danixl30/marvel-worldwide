import { ArchEnemyId } from './value-objects/arch.enemy.id'
import { ArchEnemyName } from './value-objects/arch.enemy.name'
import { Entity } from 'src/core/domain/entity/entity'

export class ArchEnemy extends Entity<ArchEnemyId> {
    constructor(id: ArchEnemyId, private _name: ArchEnemyName) {
        super(id)
    }

    get name() {
        return this._name
    }
}
