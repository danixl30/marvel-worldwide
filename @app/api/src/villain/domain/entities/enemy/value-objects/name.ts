import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class EnemyName implements ValueObject<EnemyName> {
    private constructor(private readonly name: string) {}

    public get value(): string {
        return this.name
    }

    equals(other: EnemyName): boolean {
        return other.name === this.name
    }
}
