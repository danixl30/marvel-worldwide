import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class MemberName implements ValueObject<MemberName> {
    constructor(private readonly name: string) {}

    get value() {
        return this.name
    }

    equals(other: MemberName): boolean {
        return other.value === this.value
    }
}
