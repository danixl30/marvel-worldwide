import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { regExpUUID } from 'src/utils/reg-exps/UUID'

export class OrganizationLeader implements ValueObject<OrganizationLeader> {
    constructor(private readonly _id: string, private readonly _kind: string) {
        if (!regExpUUID.test(this.id) || !_kind)
            throw new Error('Invalid organization leader')
        if (
            this.kind != 'hero' &&
            this.kind != 'villain' &&
            this.kind != 'civil'
        )
            throw new Error(
                'Organization leader must be a hero, villain or civil',
            )
    }

    get value() {
        return this.id
    }

    get id() {
        return this._id
    }

    get kind() {
        return this._kind
    }

    equals(other: OrganizationLeader): boolean {
        return other.id === this.id && other.kind === this.kind
    }
}
