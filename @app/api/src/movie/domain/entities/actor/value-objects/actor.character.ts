import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { regExpUUID } from 'src/utils/reg-exps/UUID'

export class ActorCharacter implements ValueObject<ActorCharacter> {
    constructor(private readonly _id: string, private readonly _name: string) {
        if (!regExpUUID.test(this.id) || !this.name) throw new Error('Invalid actor character')
    }

    get name() {
        return this._name
    }

    get id() {
        return this._id
    }

    get value() {
        return this.id + ' ' + this.name
    }

    equals(other: ActorCharacter): boolean {
        return other.value === this.value
    }
}
