import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class VideogameType implements ValueObject<VideogameType> {
    constructor(private readonly type: string) {
        if (!type) throw new Error('Invalid videogame type')
    }

    get value() {
        return this.type
    }

    equals(other: VideogameType): boolean {
        return other.value === this.value
    }
}
