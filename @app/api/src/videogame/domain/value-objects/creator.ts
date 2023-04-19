import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class VideogameCreator implements ValueObject<VideogameCreator> {
    constructor(private readonly name: string) {
        if (!name) throw new Error('Invalid videogame creator')
    }

    get value() {
        return this.name
    }

    equals(other: VideogameCreator): boolean {
        return other.value === this.value
    }
}
