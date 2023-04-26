import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class HeadquarterPlace implements ValueObject<HeadquarterPlace> {
    constructor(private readonly country: string, private readonly city: string) {
        if (!country || !city) throw new Error('Invalid headquarter place')
    }

    get value() {
        return this.city + ', ' + this.country
    }

    equals(other: HeadquarterPlace): boolean {
        return other.value === this.value
    }
}
