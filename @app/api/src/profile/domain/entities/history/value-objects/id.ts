import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class HistoryId implements ValueObject<HistoryId> {
    constructor(private readonly id: string) {}

    get value() {
        return this.id
    }

    equals(other: HistoryId): boolean {
        return other.value === this.value
    }
}
