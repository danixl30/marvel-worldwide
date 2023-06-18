import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class MovieCreator implements ValueObject<MovieCreator> {
    constructor(private readonly name: string) {
        if (!name) throw new Error('Movie creator cannot be null')
    }

    get value() {
        return this.name
    }

    equals(other: MovieCreator): boolean {
        return other.value === this.value
    }
}
