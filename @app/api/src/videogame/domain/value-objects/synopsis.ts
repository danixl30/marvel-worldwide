import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class VideogameSynopsis implements ValueObject<VideogameSynopsis> {
    constructor(private readonly synopsis: string) {
        if (!synopsis) throw new Error('Invalid Videogame synopsis')
    }

    get value() {
        return this.synopsis
    }

    equals(other: VideogameSynopsis): boolean {
        return other.value === this.value
    }
}
