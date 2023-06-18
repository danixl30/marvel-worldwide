import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class MovieDirector implements ValueObject<MovieDirector> {
    constructor(private readonly name: string) {
        if (!this.name) throw new Error('Movie director cannot be null')
    }

    get value() {
        return this.name
    }

    equals(other: MovieDirector): boolean {
        return other.value === this.value
    }
}
