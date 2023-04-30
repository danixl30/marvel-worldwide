import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class RateKind implements ValueObject<RateKind> {
    constructor(private readonly _kind: string) {
        if (!this.kind) throw new Error('Invalid rate target')
    }

    get kind() {
        return this._kind
    }

    get value() {
        return this.kind
    }

    equals(other: RateKind): boolean {
        return other.value === this.value
    }
}
