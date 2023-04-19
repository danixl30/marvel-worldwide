import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class PersonOccupation implements ValueObject<PersonOccupation> {
    constructor(private readonly occupation: string) {
        if (!occupation) throw new Error('Invalid ocupation')
    }

    get value() {
        return this.occupation
    }

    equals(other: PersonOccupation): boolean {
        return other.value === this.value
    }
}
