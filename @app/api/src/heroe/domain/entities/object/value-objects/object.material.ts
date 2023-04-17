import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class ObjectMaterial implements ValueObject<ObjectMaterial> {
    constructor(private readonly maritial: string) {}

    get value() {
        return this.maritial
    }

    equals(other: ObjectMaterial): boolean {
        return other.value === this.value
    }
}
