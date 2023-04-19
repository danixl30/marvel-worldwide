import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class HeadquarterKind implements ValueObject<HeadquarterKind> {
    constructor(private readonly kind: string) {
        if (!kind) throw new Error('Invalid headquarter kind')
    }

    get value() {
        return this.kind
    }

    equals(other: HeadquarterKind): boolean {
        return other.value === this.value
    }
}
