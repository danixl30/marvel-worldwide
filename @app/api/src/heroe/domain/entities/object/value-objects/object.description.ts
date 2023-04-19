import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class ObjectDescription implements ValueObject<ObjectDescription> {
    constructor(private readonly description: string) {
        if (!description) throw new Error('Invalid description')
    }

    get value() {
        return this.description
    }

    equals(other: ObjectDescription): boolean {
        return other.value === this.value
    }
}
