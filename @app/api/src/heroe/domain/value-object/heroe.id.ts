import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class HeroeId implements ValueObject<HeroeId> {
    constructor(private readonly id: string) {}

    public get value(): string {
        return this.id
    }

    equals(other: HeroeId): boolean {
        return other.value === this.value
    }
}
