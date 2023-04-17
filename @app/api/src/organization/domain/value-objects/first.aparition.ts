import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class FirstAparition implements ValueObject<FirstAparition> {
    constructor(private readonly year: number) {}

    get value() {
        return this.year
    }

    equals(other: FirstAparition): boolean {
        return other.value === this.value
    }
}
