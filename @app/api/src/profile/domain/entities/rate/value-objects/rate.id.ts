import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class RateId implements ValueObject<RateId> {
    constructor(private readonly id: string) {}

    get value() {
        return this.id
    }

    equals(other: RateId): boolean {
        return other.value === this.value
    }
}
