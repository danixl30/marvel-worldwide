import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { regExpUUID } from 'src/utils/reg-exps/UUID'

export class ProfileId implements ValueObject<ProfileId> {
    constructor(private readonly id: string) {
        if (!regExpUUID.test(id)) throw new Error('Invalid profile id')
    }

    get value() {
        return this.id
    }

    equals(other: ProfileId): boolean {
        return other.value === this.value
    }
}
