import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class SerieTitle implements ValueObject<SerieTitle> {
    constructor(private readonly title: string) {
        if (!title) throw new Error('Invalid serie title')
    }

    get value() {
        return this.title
    }

    equals(other: SerieTitle): boolean {
        return other.value === this.value
    }
}
