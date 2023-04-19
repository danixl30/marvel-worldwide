import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { regExpUUID } from 'src/utils/reg-exps/UUID'

export class VideogameId implements ValueObject<VideogameId> {
    constructor(private readonly id: string) {
        if (!regExpUUID.test(id)) throw new Error('Invalid serie id')
    }

    get value() {
        return this.id
    }

    equals(other: VideogameId): boolean {
        return other.value === this.value
    }
}
