import { ValueObject } from 'src/core/domain/value-objects/value.object'

export enum ActorRoleType {
    PROTAGONIST = 'protagonist',
    ANTAGONIST = 'antagonist',
    SECONDARY = 'secondary',
}
export class ActorRole implements ValueObject<ActorRole> {
    constructor(private readonly role: ActorRoleType) {
        if (!role) throw new Error('Invalid role')
        if (
            role != 'protagonist' &&
            role != 'antagonist' &&
            role != 'secondary'
        )
            throw new Error(
                'The role of an actor\'s Character in Media must be either "Protagonist", "Antagonist" or "Secondary"',
            )
    }

    get value() {
        return this.role
    }

    equals(other: ActorRole): boolean {
        return other.value === this.value
    }
}
