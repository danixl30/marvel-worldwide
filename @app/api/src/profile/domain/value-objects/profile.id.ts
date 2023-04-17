import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class ProfileId implements ValueObject<ProfileId> {
    constructor(private readonly id: string) {}

    get value() {
        return this.id
    }

    equals(other: ProfileId): boolean {
        return other.value === this.value
    }
}
