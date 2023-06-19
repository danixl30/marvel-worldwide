import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class SerieCreator implements ValueObject<SerieCreator> {
    constructor(private readonly name: string) {
        if (!name) throw new Error("Invalid Series' creator")
    }

    get value() {
        return this.name
    }

    equals(other: SerieCreator): boolean {
        return other.value === this.value
    }
}
