import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class ObjectId implements ValueObject<ObjectId> {
    constructor(private readonly id: string) {}

    get value() {
        return this.id
    }

    equals(other: ObjectId): boolean {
        return other.value === this.value
    }
}
