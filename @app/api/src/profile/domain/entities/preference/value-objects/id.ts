import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { regExpUUID } from 'src/utils/reg-exps/UUID'

export class PreferenceId implements ValueObject<PreferenceId> {
    constructor(private readonly id: string) {
        if (!regExpUUID.test(id)) throw new Error('Invalid preference id')
    }

    get value() {
        return this.id
    }

    equals(other: PreferenceId): boolean {
        return other.value === this.value
    }
}
