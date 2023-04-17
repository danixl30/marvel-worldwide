import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class ProfileUser implements ValueObject<ProfileUser> {
    constructor(private readonly userId: string) {}

    get value() {
        return this.userId
    }

    equals(other: ProfileUser): boolean {
        return other.value === this.value
    }
}
