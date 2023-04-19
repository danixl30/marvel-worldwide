import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { regExpUUID } from 'src/utils/reg-exps/UUID'

export class CivilRelationship implements ValueObject<CivilRelationship> {
    constructor(
        private readonly _targetId: string,
        private readonly _kind: string,
    ) {
        if (
            !regExpUUID.test(this.targetId) ||
            !this.kind ||
            this.kind.length < 5
        )
            throw new Error('invalid relationship')
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

    equals(other: CivilRelationship): boolean {
        return other.value === this.value
    }
}
