import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class PersonId implements ValueObject<PersonId> {
    constructor(private readonly id: string) {}

    get value() {
        return this.id
    }

    equals(other: PersonId): boolean {
        return other.value === this.value
    }
}
