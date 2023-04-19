import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class PowerName implements ValueObject<PowerName> {
    constructor(private readonly name: string) {
        if (!name) throw new Error('Invalid power name')
    }

    get value(): string {
        return this.name
    }

    equals(other: PowerName): boolean {
        return other.value === this.value
    }
}
