import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { regExpUUID } from 'src/utils/reg-exps/UUID'

export class CombatId implements ValueObject<CombatId> {
    constructor(private readonly id: string) {
        if (!regExpUUID.test(id)) throw new Error('Invalid Combat ID')
    }

    get value() {
        return this.id
    }

    equals(other: CombatId): boolean {
        return other.value === this.value
    }
}
