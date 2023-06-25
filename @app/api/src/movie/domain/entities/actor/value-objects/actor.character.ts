import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { regExpUUID } from 'src/utils/reg-exps/UUID'

export class ActorCharacter implements ValueObject<ActorCharacter> {
    constructor(private readonly _id: string, private readonly _kind: string) {
        if (!regExpUUID.test(this.id) || !_kind)
            throw new Error('Invalid actor character')
        if (
            this.kind != 'heroe' &&
            this.kind != 'villain' &&
            this.kind != 'civil'
        )
            throw new Error(
                'A certain character can only be a heroe, villain or civil',
            )
    }

    get id() {
        return this._id
    }

    get kind() {
        return this._kind
    }

    get value() {
        return this.id + this.kind
    }

    equals(other: ActorCharacter): boolean {
        return other.value === this.value
    }
}
