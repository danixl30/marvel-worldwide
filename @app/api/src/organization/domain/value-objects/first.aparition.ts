import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class FirstAparition implements ValueObject<FirstAparition> {
    constructor(private readonly comic: string) {
        if (!comic) throw new Error('Invalid first apparition')
    }

    get value() {
        return this.comic
    }

    equals(other: FirstAparition): boolean {
        return other.value === this.value
    }
}
