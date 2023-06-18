import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class SuitColor implements ValueObject<SuitColor> {
    constructor(private readonly color: string) {
        if (!color) throw new Error('Color cannot be null')
    }

    get value() {
        return this.color
    }

    equals(other: SuitColor): boolean {
        return other.value === this.value
    }
}
