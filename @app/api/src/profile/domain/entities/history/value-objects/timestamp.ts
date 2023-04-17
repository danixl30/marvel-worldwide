import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class HistoryTimestamp implements ValueObject<HistoryTimestamp> {
    constructor(private readonly date = new Date()) {}

    get value() {
        return this.date
    }

    get seconds() {
        return this.date.getTime()
    }

    equals(other: HistoryTimestamp): boolean {
        return other.value.getTime() === this.value.getTime()
    }
}
