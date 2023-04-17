import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class RateTarget implements ValueObject<RateTarget> {
    constructor(
        private readonly _targetId: string,
        private readonly _kind: string,
    ) {}

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
