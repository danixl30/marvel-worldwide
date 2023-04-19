import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class PersonId implements ValueObject<PersonId> {
    constructor(private readonly id: string) {
        if (!id) throw new Error('Invalid person id')
    }

    get value() {
        return this.id
    }

    equals(other: PersonId): boolean {
        return other.value === this.value
    }
}
