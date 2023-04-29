import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { regExpUUID } from 'src/utils/reg-exps/UUID'

export class OrganizationFounder implements ValueObject<OrganizationFounder> {
    constructor(private readonly _id: string) {
        if (!regExpUUID.test(this.id))
            throw new Error('Invalid organization founder')
    }

    get value() {
        return this.id
    }

    get id() {
        return this._id
    }

    equals(other: OrganizationFounder): boolean {
        return other.id === this.id
    }
}
