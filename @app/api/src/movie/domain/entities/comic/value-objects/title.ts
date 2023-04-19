import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class ComicTitle implements ValueObject<ComicTitle> {
    constructor(private readonly title: string) {
        if (!title) throw new Error('Invalid comic title')
    }

    get value() {
        return this.title
    }

    equals(other: ComicTitle): boolean {
        return other.value === this.value
    }
}
