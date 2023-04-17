import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class PreferenceId implements ValueObject<PreferenceId> {
    constructor(private readonly id: string) {}

    get value() {
        return this.id
    }

    equals(other: PreferenceId): boolean {
        return other.value === this.value
    }
}
