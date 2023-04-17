import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class VideogameId implements ValueObject<VideogameId> {
    constructor(private readonly id: string) {}

    get value() {
        return this.id
    }

    equals(other: VideogameId): boolean {
        return other.value === this.value
    }
}
