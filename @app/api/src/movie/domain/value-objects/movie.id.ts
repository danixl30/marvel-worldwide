import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class MovieId implements ValueObject<MovieId> {
    constructor(private readonly id: string) {}

    get value() {
        return this.id
    }

    equals(other: MovieId): boolean {
        return other.value === this.value
    }
}
