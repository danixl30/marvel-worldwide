import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class OrganizationName implements ValueObject<OrganizationName> {
    constructor(private readonly name: string) {}

    get value() {
        return this.name
    }

    equals(other: OrganizationName): boolean {
        return other.value === this.value
    }
}
