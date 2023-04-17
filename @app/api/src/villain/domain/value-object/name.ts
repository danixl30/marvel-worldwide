import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class VillainName implements ValueObject<VillainName> {
    private constructor(private readonly name: string) {}

    public get value(): string {
        return this.name
    }

    equals(other: VillainName): boolean {
        return other.name === this.name
    }
}
