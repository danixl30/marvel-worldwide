import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class PersonHair implements ValueObject<PersonHair> {
    constructor(private readonly color: string) {
        if (!color) throw new Error('Invalid hair color')
    }

    get value() {
        return this.color
    }

    equals(other: PersonHair): boolean {
        return other.value === this.value
    }
}
