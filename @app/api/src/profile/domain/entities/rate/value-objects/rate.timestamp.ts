import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class RateTimestamp implements ValueObject<RateTimestamp> {
    constructor(private readonly timestamp = new Date()) {}

    get value() {
        return this.timestamp
    }

    equals(other: RateTimestamp): boolean {
        return other.value.getTime() === this.value.getTime()
    }
}
