import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class OrganizationObjetive implements ValueObject<OrganizationObjetive> {
    constructor(private readonly objetive: string) {
        if (!objetive) throw new Error('Invalid organization objetive')
    }

    get value() {
        return this.objetive
    }

    equals(other: OrganizationObjetive): boolean {
        return other.value === this.value
    }
}
