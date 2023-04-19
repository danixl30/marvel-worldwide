import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class CreationPlace implements ValueObject<CreationPlace> {
    constructor(private readonly place: string) {
        if (!place) throw new Error('Invalid place')
    }

    get value() {
        return this.place
    }

    equals(other: CreationPlace): boolean {
        return other.value === this.value
    }
}
