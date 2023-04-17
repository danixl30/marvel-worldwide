import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class ActorId implements ValueObject<ActorId> {
    constructor(private readonly id: string) {}

    get value() {
        return this.id
    }

    equals(other: ActorId): boolean {
        return other.value === this.value
    }
}
