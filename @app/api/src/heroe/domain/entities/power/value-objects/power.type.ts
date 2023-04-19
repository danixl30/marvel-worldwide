import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class PowerType implements ValueObject<PowerType> {
    constructor(private readonly type: string) {
        if (!type) throw new Error('Invalid power type')
    }

    get value(): string {
        return this.type
    }

    equals(other: PowerType): boolean {
        return other.value === this.value
    }
}
