import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class OrganizationId implements ValueObject<OrganizationId> {
    constructor(private readonly id: string) {
        if (!id) throw new Error('Invalid organization id')
    }

    get value(): string {
        return this.id
    }

    equals(other: OrganizationId): boolean {
        return other.value === this.value
    }
}
