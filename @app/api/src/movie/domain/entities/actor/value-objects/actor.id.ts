import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { regExpUUID } from 'src/utils/reg-exps/UUID'

export class ActorId implements ValueObject<ActorId> {
    constructor(private readonly id: string) {
        if (!regExpUUID.test(id)) throw new Error('Invalid actor id')
    }

    get value() {
        return this.id
    }

    equals(other: ActorId): boolean {
        return other.value === this.value
    }
}
