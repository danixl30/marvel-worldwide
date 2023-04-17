import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class PowerName implements ValueObject<PowerName> {
    constructor(private readonly id: string) {}

    get value(): string {
        return this.id
    }

    equals(other: PowerName): boolean {
        return other.value === this.value
    }
}
