import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class MovieTitle implements ValueObject<MovieTitle> {
    constructor(private readonly title: string) {
        if (!title) throw new Error('Invalid title')
    }

    get value() {
        return this.title
    }

    equals(other: MovieTitle): boolean {
        return other.value === this.value
    }
}
