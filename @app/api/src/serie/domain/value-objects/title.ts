import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class SerieTitle implements ValueObject<SerieTitle> {
    constructor(private readonly title: string) {}

    get value() {
        return this.title
    }

    equals(other: SerieTitle): boolean {
        return other.value === this.value
    }
}
