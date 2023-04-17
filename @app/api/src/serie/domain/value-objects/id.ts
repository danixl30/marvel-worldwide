import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class SerieId implements ValueObject<SerieId> {
    constructor(private readonly id: string) {}

    get value() {
        return this.id
    }

    equals(other: SerieId): boolean {
        return other.value === this.value
    }
}
