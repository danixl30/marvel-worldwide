import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class PersonEye implements ValueObject<PersonEye> {
    constructor(private readonly color: string) {}

    get value() {
        return this.color
    }

    equals(other: PersonEye): boolean {
        return other.value === this.value
    }
}
