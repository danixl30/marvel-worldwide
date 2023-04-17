import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class CivilId implements ValueObject<CivilId> {
    constructor(private readonly id: string) {}

    get value() {
        return this.id
    }

    equals(other: CivilId): boolean {
        return other.value === this.value
    }
}
