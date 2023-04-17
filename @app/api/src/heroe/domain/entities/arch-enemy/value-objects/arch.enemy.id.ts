import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class ArchEnemyId implements ValueObject<ArchEnemyId> {
    private constructor(private readonly id: string) {}

    public get value(): string {
        return this.id
    }

    equals(other: ArchEnemyId): boolean {
        return other.id === this.id
    }
}
