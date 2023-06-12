import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class MovieDirector implements ValueObject<MovieDirector> {
    constructor(private readonly name: string) {
        if (!this.name) throw new Error('Invalid movie director')
    }

    get value() {
        return this.name
    }

    equals(other: MovieDirector): boolean {
        return other.value === this.value
    }
}
