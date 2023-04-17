import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class VideogameRating implements ValueObject<VideogameRating> {
    constructor(private readonly rate: number) {}

    get value() {
        return this.rate
    }

    equals(other: VideogameRating): boolean {
        return other.value === this.value
    }
}
