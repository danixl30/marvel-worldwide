import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { regExpUUID } from 'src/utils/reg-exps/UUID'

export class HeadquarterId implements ValueObject<HeadquarterId> {
    constructor(private readonly id: string) {
        if (!regExpUUID.test(id)) throw new Error('Invalid headquarter id')
    }

    get value() {
        return this.id
    }

    equals(other: HeadquarterId): boolean {
        return other.value === this.value
    }
}
