import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class HeadquarterId implements ValueObject<HeadquarterId> {
    constructor(private readonly id: string) {}

    get value() {
        return this.id
    }

    equals(other: HeadquarterId): boolean {
        return other.value === this.value
    }
}
