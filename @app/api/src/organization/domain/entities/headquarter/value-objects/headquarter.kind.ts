import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class HeadquarterKind implements ValueObject<HeadquarterKind> {
    constructor(private readonly kind: string) {}

    get value() {
        return this.kind
    }

    equals(other: HeadquarterKind): boolean {
        return other.value === this.value
    }
}
