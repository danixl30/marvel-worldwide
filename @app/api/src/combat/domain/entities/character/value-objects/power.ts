import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { regExpUUID } from 'src/utils/reg-exps/UUID'

export class PowerId implements ValueObject<PowerId> {
    constructor(private readonly id: string) {
        if (regExpUUID.test(id)) throw new Error('Invalid power id')
    }

    get value() {
        return this.id
    }

    equals(other: PowerId): boolean {
        return other.value === this.value
    }
}
