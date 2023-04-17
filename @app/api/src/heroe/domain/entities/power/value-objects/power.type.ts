import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class PowerType implements ValueObject<PowerType> {
    constructor(private readonly type: string) {}

    get value(): string {
        return this.type
    }

    equals(other: PowerType): boolean {
        return other.value === this.value
    }
}
