import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class MemberCharge implements ValueObject<MemberCharge> {
    constructor(private readonly charge: string) {
        if (!charge) throw new Error('Invalid charge')
    }

    get value() {
        return this.charge
    }

    equals(other: MemberCharge): boolean {
        return other.value === this.value
    }
}
