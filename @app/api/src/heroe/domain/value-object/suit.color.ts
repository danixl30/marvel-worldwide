import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class SuitColor implements ValueObject<SuitColor> {
    constructor(private readonly color: string) {
        if (!color) throw new Error('Invalid color')
    }

    get value() {
        return this.color
    }

    equals(other: SuitColor): boolean {
        return other.value === this.value
    }
}
