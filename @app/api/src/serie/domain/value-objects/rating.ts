import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class SerieRating implements ValueObject<SerieRating> {
    constructor(private readonly rate: number) {}

    get value() {
        return this.rate
    }

    equals(other: SerieRating): boolean {
        return other.value === this.value
    }
}
