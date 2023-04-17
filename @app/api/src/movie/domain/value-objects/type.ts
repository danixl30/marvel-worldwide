import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class MovieType implements ValueObject<MovieType> {
    constructor(private readonly type: string) {}

    get value() {
        return this.type
    }

    equals(other: MovieType): boolean {
        return other.value === this.value
    }
}
