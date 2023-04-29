import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { regExpUUID } from 'src/utils/reg-exps/UUID'

export class RateTarget implements ValueObject<RateTarget> {
    constructor(
        private readonly _targetId: string,
        private readonly _kind: string,
    ) {
        if (!regExpUUID.test(this.targetId) || !this.kind)
            throw new Error('Invalid rate target')
    }

    get targetId() {
        return this._targetId
    }

    get kind() {
        return this._kind
    }

    get value() {
        return this.targetId + ' ' + this.kind
    }

    equals(other: RateTarget): boolean {
        return other.value === this.value
    }
}
