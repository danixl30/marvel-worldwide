import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class ComicTitle implements ValueObject<ComicTitle> {
    constructor(private readonly title: string) {}

    get value() {
        return this.title
    }

    equals(other: ComicTitle): boolean {
        return other.value === this.value
    }
}
