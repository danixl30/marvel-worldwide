import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { regExpUUID } from 'src/utils/reg-exps/UUID'

export class MemberId implements ValueObject<MemberId> {
    constructor(private readonly _id: string, private readonly _kind: string) {
        if (!regExpUUID.test(_id) || _kind) throw new Error('Invalid member id')
    }

    get id() {
        return this._id
    }

    get kind() {
        return this._kind
    }

    get value() {
        return this.id + this.kind
    }

    equals(other: MemberId): boolean {
        return other.value === this.value
    }
}
