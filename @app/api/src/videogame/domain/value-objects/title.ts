import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class VideogameTitle implements ValueObject<VideogameTitle> {
    constructor(private readonly title: string) {
        if (!title) throw new Error('Invalid Videogame title')
    }

    get value() {
        return this.title
    }

    equals(other: VideogameTitle): boolean {
        return other.value === this.value
    }
}
