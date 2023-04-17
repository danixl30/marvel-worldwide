import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class ActorRole implements ValueObject<ActorRole> {
    constructor(private readonly role: string) {}

    get value() {
        return this.role
    }

    equals(other: ActorRole): boolean {
        return other.value === this.value
    }
}
