import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class MovieRating implements ValueObject<MovieRating> {
    constructor(private readonly rate: number) {
        if (!rate || rate < 1 || rate > 5) throw new Error('Invalid rate')
    }

    get value() {
        return this.rate
    }

    equals(other: MovieRating): boolean {
        return other.value === this.value
    }
}
