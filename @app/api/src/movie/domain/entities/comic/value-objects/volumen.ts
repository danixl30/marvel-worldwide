import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class ComicVolumen implements ValueObject<ComicVolumen> {
    constructor(private readonly volumen: number) {
        if (!volumen || volumen < 0) throw new Error('Invalid comic volumen')
    }

    get value() {
        return this.volumen
    }

    equals(other: ComicVolumen): boolean {
        return other.value === this.value
    }
}
