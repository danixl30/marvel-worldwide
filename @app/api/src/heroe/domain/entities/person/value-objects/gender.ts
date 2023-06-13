import { ValueObject } from 'src/core/domain/value-objects/value.object'

export enum Genders {
    MALE = 'M',
    FEMALE = 'F',
    UNKWON = 'U',
    OTHER = 'O',
}

export class PersonGender implements ValueObject<PersonGender> {
    constructor(private readonly gender: Genders) {}

    get value() {
        return this.gender
    }

    equals(other: PersonGender): boolean {
        return other.value === this.value
    }
}
