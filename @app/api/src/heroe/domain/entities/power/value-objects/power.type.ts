import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class PowerType implements ValueObject<PowerType> {
    constructor(private readonly type: string) {
        if (
            !type ||
            !['artificial', 'natural', 'inherited'].find((e) => e === type)
        )
            throw new Error(
                'Power type must be either "artificial", "natural" or "inherited"',
            )
    }

    get value(): string {
        return this.type
    }

    equals(other: PowerType): boolean {
        return other.value === this.value
    }
}
