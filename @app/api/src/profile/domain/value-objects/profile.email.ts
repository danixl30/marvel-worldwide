import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { emailRegExp } from 'src/utils/reg-exps/email'

export class ProfileEmail implements ValueObject<ProfileEmail> {
    constructor(private readonly email: string) {
        if (!emailRegExp.test(email)) throw new Error('Invalid profile email')
    }

    get value() {
        return this.email
    }

    equals(other: ProfileEmail): boolean {
        return other.value === this.value
    }
}
