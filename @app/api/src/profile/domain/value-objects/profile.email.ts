import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class ProfileEmail implements ValueObject<ProfileEmail> {
    constructor(private readonly email: string) {}

    get value() {
        return this.email
    }

    equals(other: ProfileEmail): boolean {
        return other.value === this.value
    }
}
