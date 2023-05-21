import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { regExpUUID } from 'src/utils/reg-exps/UUID'

export class OrganizationRef implements ValueObject<OrganizationRef> {
    constructor(
        private readonly id: string,
        private readonly _participationType: string,
    ) {
        if (!regExpUUID.test(id) || !_participationType)
            throw new Error('Invalid organization ref')
    }

    get participationType() {
        return this._participationType
    }

    get value() {
        return this.id
    }

    equals(other: OrganizationRef): boolean {
        return (
            other.value === this.value &&
            other.participationType === this.participationType
        )
    }
}
