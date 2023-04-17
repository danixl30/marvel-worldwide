import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class ArchEnemyName implements ValueObject<ArchEnemyName> {
    private constructor(private readonly name: string) {}

    public get value(): string {
        return this.name
    }

    equals(other: ArchEnemyName): boolean {
        return other.name === this.name
    }
}
