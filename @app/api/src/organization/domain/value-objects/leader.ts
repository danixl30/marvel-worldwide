import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { regExpUUID } from 'src/utils/reg-exps/UUID'

export class OrganizationLeader implements ValueObject<OrganizationLeader> {
    constructor(private readonly _id: string, private readonly _name: string) {
        if (!regExpUUID.test(this.id) || !this.name) throw new Error('Invalid organization leader')
    }

    get value() {
        return this.id + ' - ' + this.name
    }

    get name() {
        return this._name
    }

    get id() {
        return this._id
    }

    equals(other: OrganizationLeader): boolean {
        return other.id === this.id && other.name === this.name
    }
}
