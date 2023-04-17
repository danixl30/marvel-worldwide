import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class OrganizationFounder implements ValueObject<OrganizationFounder> {
    constructor(private readonly _id: string, private readonly _name: string) {}

    get value() {
        return this.id + ' - ' + this.name
    }

    get name() {
        return this._name
    }

    get id() {
        return this._id
    }

    equals(other: OrganizationFounder): boolean {
        return other.id === this.id && other.name === this.name
    }
}
