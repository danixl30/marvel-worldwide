import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class VillainName implements ValueObject<VillainName> {
    constructor(private readonly name: string) {
        if (!name) throw new Error('Invalid villain name')
    }

    public get value(): string {
        return this.name
    }

    equals(other: VillainName): boolean {
        return other.name === this.name
    }
}
