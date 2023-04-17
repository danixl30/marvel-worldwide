import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class ObjectDescription implements ValueObject<ObjectDescription> {
    constructor(private readonly description: string) {}

    get value() {
        return this.description
    }

    equals(other: ObjectDescription): boolean {
        return other.value === this.value
    }
}
