import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class ActorName implements ValueObject<ActorName> {
    constructor(
        private readonly _firstName: string,
        private readonly _lastName: string,
    ) {}

    get firstName() {
        return this._firstName
    }

    get lastName() {
        return this._lastName
    }

    get value() {
        return this.firstName + ' ' + this.lastName
    }

    equals(other: ActorName): boolean {
        return other.value === this.value
    }
}
