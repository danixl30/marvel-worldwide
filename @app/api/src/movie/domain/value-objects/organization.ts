import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { regExpUUID } from 'src/utils/reg-exps/UUID'

export enum OrgParticipationType {
    PROTAGONIST = 'protagonist',
    ENEMY = 'enemy',
    SECONDARY = 'secondary',
}
export class OrganizationRef implements ValueObject<OrganizationRef> {
    constructor(
        private readonly id: string,
        private readonly _participationType: OrgParticipationType,
    ) {
        if (!regExpUUID.test(id) || !_participationType)
            throw new Error(
                'Organization ID and participation type cannot be null',
            )
        if (
            this.participationType != 'protagonist' &&
            this.participationType != 'enemy' &&
            this.participationType != 'secondary'
        )
            throw new Error(
                'The participation type of an Organization in Media must be either "Protagonist", "Enemy" or "Secondary"',
            )
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
