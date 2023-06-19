import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { regExpUUID } from 'src/utils/reg-exps/UUID'

export class RateId implements ValueObject<RateId> {
    constructor(private readonly id: string) {
        if (!regExpUUID.test(id)) throw new Error('Invalid Rate id')
    }

    get value() {
        return this.id
    }

    equals(other: RateId): boolean {
        return other.value === this.value
    }
}
