import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { regExpUUID } from 'src/utils/reg-exps/UUID'

export class MemberId implements ValueObject<MemberId> {
    constructor(private readonly id: string) {
        if (!regExpUUID.test(id)) throw new Error('Invalid member id')
    }

    get value() {
        return this.id
    }

    equals(other: MemberId): boolean {
        return other.value === this.value
    }
}
