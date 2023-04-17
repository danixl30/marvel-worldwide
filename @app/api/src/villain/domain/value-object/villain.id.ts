import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class VillainId implements ValueObject<VillainId> {
    constructor(private readonly id: string) {}

    public get value(): string {
        return this.id
    }

    equals(other: VillainId): boolean {
        return other.value === this.value
    }
}
