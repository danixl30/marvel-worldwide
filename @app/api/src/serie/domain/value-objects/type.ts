import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class SerieType implements ValueObject<SerieType> {
    constructor(private readonly type: string) {
        if (!type) throw new Error('Invalid serie type')
    }

    get value() {
        return this.type
    }

    equals(other: SerieType): boolean {
        return other.value === this.value
    }
}
