import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class MemberName implements ValueObject<MemberName> {
    constructor(private readonly name: string) {
        if (!name) throw new Error('Invalid member name')
    }

    get value() {
        return this.name
    }

    equals(other: MemberName): boolean {
        return other.value === this.value
    }
}
