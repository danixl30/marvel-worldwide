import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class HeadquarterName implements ValueObject<HeadquarterName> {
    constructor(private readonly name: string) {}

    get value() {
        return this.name
    }

    equals(other: HeadquarterName): boolean {
        return other.value === this.value
    }
}
