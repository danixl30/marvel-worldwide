import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { regExpUUID } from 'src/utils/reg-exps/UUID'

export class SerieId implements ValueObject<SerieId> {
    constructor(private readonly id: string) {
        if (!regExpUUID.test(id)) throw new Error('Invalid serie id')
    }

    get value() {
        return this.id
    }

    equals(other: SerieId): boolean {
        return other.value === this.value
    }
}
