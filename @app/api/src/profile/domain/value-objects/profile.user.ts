import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { regExpUUID } from 'src/utils/reg-exps/UUID'

export class ProfileUser implements ValueObject<ProfileUser> {
    constructor(private readonly userId: string) {
        if (!regExpUUID.test(userId)) throw new Error('Invalid user id')
    }

    get value() {
        return this.userId
    }

    equals(other: ProfileUser): boolean {
        return other.value === this.value
    }
}
