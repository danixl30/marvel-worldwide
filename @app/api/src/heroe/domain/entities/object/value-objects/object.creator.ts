import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class ObjectCreator implements ValueObject<ObjectCreator> {
    constructor(private readonly _firstName: string, private readonly _lastName: string) {
        if (!this.firstName || !this.lastName) throw new Error('Invalid object creator')
    }

    get firstName() {
        return this._firstName
    }

    get lastName() {
        return this._lastName
    }

    get value() {
        return this.firstName + ' ' + this.lastName
    }

    equals(other: ObjectCreator): boolean {
        return other.value === this.value
    }
}
