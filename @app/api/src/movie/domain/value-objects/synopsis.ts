import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class MovieSynopsis implements ValueObject<MovieSynopsis> {
    constructor(private readonly synopsis: string) {
        if (!synopsis) throw new Error('Invalid synopsis')
    }

    get value() {
        return this.synopsis
    }

    equals(other: MovieSynopsis): boolean {
        return other.value === this.value
    }
}
