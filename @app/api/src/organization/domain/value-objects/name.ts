import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class OrganizationName implements ValueObject<OrganizationName> {
    constructor(private readonly name: string) {
        if (!name) throw new Error('Invalid organization name')
    }

    get value() {
        return this.name
    }

    equals(other: OrganizationName): boolean {
        return other.value === this.value
    }
}
