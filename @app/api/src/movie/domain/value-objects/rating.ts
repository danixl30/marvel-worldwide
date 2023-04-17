import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class MovieRating implements ValueObject<MovieRating> {
    constructor(private readonly rate: number) {}

    get value() {
        return this.rate
    }

    equals(other: MovieRating): boolean {
        return other.value === this.value
    }
}
