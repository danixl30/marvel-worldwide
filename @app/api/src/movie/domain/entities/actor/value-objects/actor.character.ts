import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { regExpUUID } from 'src/utils/reg-exps/UUID'

export class ActorCharacter implements ValueObject<ActorCharacter> {
    constructor(private readonly _id: string) {
        if (!regExpUUID.test(this.id))
            throw new Error('Invalid actor character')
    }

    get id() {
        return this._id
    }

    get value() {
        return this.id
    }

    equals(other: ActorCharacter): boolean {
        return other.value === this.value
    }
}
