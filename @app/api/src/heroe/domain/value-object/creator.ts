import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class HeroeCreator implements ValueObject<HeroeCreator> {
    constructor(private readonly _firstName: string, private readonly _lastName: string) {
        if (!this.firstName || !this.lastName) throw new Error('Inavlid creator')
    }

    get firstName() {
        return this._firstName
    }

    get lastName() {
        return this._lastName
    }

    public get value(): string {
        return this.firstName + ' ' + this.lastName
    }

    equals(other: HeroeCreator): boolean {
        return other.firstName === this.firstName && other.lastName === this.lastName
    }
}
