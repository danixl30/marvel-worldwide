import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class ObjectKind implements ValueObject<ObjectKind> {
    constructor(private readonly kind: string) {}

    get value() {
        return this.kind
    }

    equals(other: ObjectKind): boolean {
        return other.value === this.value
    }
}
