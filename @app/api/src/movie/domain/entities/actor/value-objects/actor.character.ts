import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { regExpUUID } from 'src/utils/reg-exps/UUID'

export enum CharParticipationType {
    PROTAGONIST = 'protagonist',
    ANTAGONIST = 'antagonist',
    SECONDARY = 'secondary',
}
export class ActorCharacter implements ValueObject<ActorCharacter> {
    constructor(
        private readonly _id: string,
        private readonly _kind: CharParticipationType,
    ) {
        if (!regExpUUID.test(this.id) || !_kind)
            throw new Error('Invalid actor character')
        if (
            this.kind != 'protagonist' &&
            this.kind != 'antagonist' &&
            this.kind != 'secondary'
        )
            throw new Error(
                'The participation type of an actor\'s Character in Media must be either "Protagonist", "Antagonist" or "Secondary"',
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
