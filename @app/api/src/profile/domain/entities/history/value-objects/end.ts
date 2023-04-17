import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class HistoryEnd implements ValueObject<HistoryEnd> {
    constructor(private readonly date = new Date()) {}

    get value() {
        return this.date
    }

    get seconds() {
        return this.date.getTime()
    }

    equals(other: HistoryEnd): boolean {
        return other.value.getTime() === this.value.getTime()
    }
}
