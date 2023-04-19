import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { regExpUUID } from 'src/utils/reg-exps/UUID'

export class HistoryId implements ValueObject<HistoryId> {
    constructor(private readonly id: string) {
        if (!regExpUUID.test(id)) throw new Error('Invalid history id')
    }

    get value() {
        return this.id
    }

    equals(other: HistoryId): boolean {
        return other.value === this.value
    }
}
