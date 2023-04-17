import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class MemberId implements ValueObject<MemberId> {
    constructor(private readonly id: string) {}

    get value() {
        return this.id
    }

    equals(other: MemberId): boolean {
        return other.value === this.value
    }
}
