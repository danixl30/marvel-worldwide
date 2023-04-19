import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class ComicAuthor implements ValueObject<ComicAuthor> {
    constructor(
        private readonly _firstName: string,
        private readonly _lastName: string,
    ) {
        if (!this.firstName || !this.lastName)
            throw new Error('Invalid comic author')
    }

    get value() {
        return this.firstName + ' ' + this.lastName
    }

    get firstName() {
        return this._firstName
    }

    get lastName() {
        return this._lastName
    }

    equals(other: ComicAuthor): boolean {
        return other.value === this.value
    }
}
