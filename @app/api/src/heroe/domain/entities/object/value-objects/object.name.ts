import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class ObjectName implements ValueObject<ObjectName> {
    constructor(private readonly name: string) {
        if (!name) throw new Error('Invalid object name')
    }

    get value() {
        return this.name
    }

    equals(other: ObjectName): boolean {
        return other.value === this.value
    }
}
