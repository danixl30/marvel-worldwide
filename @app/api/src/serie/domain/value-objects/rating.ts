import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class SerieRating implements ValueObject<SerieRating> {
    constructor(private readonly rate: number) {
        if (!rate || rate < 1 || rate > 5) throw new Error('Invalid serie rating')
    }

    get value() {
        return this.rate
    }

    equals(other: SerieRating): boolean {
        return other.value === this.value
    }
}
