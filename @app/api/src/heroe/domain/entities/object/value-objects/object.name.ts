import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class ObjectName implements ValueObject<ObjectName> {
    constructor(private readonly name: string) {}

    get value() {
        return this.name
    }

    equals(other: ObjectName): boolean {
        return other.value === this.value
    }
}
