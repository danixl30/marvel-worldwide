import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class PersonNationality implements ValueObject<PersonNationality> {
    constructor(private readonly nationality: string) {
        if (!nationality) throw new Error('Invalid nationality')
    }

    get value() {
        return this.nationality
    }

    equals(other: PersonNationality): boolean {
        return other.value === this.value
    }
}
