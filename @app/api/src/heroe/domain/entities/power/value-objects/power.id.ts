import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class PowerId implements ValueObject<PowerId> {
    constructor(private readonly id: string) {}

    public get value(): string {
        return this.id
    }

    equals(other: PowerId): boolean {
        return other.value === this.value
    }
}
