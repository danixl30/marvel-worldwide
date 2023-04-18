import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class ComicVolumen implements ValueObject<ComicVolumen> {
    constructor(private readonly volumen: number) {}

    get value() {
        return this.volumen
    }

    equals(other: ComicVolumen): boolean {
        return other.value === this.value
    }
}
