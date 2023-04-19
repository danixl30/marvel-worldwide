import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class PowerDescription implements ValueObject<PowerDescription> {
    constructor(private readonly description: string) {
        if (!description) throw new Error('Invalid power description')
    }

    get value(): string {
        return this.description
    }

    equals(other: PowerDescription): boolean {
        return other.value === this.value
    }
}
