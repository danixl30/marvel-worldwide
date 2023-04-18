import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class ComicId implements ValueObject<ComicId> {
    constructor(private readonly id: string) {}

    get value() {
        return this.id
    }

    equals(other: ComicId): boolean {
        return other.value === this.value
    }
}
