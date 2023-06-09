import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { regExpUUID } from 'src/utils/reg-exps/UUID'

export class CivilId implements ValueObject<CivilId> {
    constructor(private readonly id: string) {
        if (!regExpUUID.test(id)) throw new Error('Invalid Civil ID')
    }

    get value() {
        return this.id
    }

    equals(other: CivilId): boolean {
        return other.value === this.value
    }
}
