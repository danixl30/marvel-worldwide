import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { regExpUUID } from 'src/utils/reg-exps/UUID'

export class CharacterId implements ValueObject<CharacterId> {
    constructor(private readonly id: string) {
        if (regExpUUID.test(id)) throw new Error('Invalid character id')
    }

    get value() {
        return this.id
    }

    equals(other: CharacterId): boolean {
        return other.value === this.value
    }
}
