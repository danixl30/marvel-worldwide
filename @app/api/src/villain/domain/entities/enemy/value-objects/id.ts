import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class EnemyId implements ValueObject<EnemyId> {
    constructor(private readonly id: string) {}

    public get value(): string {
        return this.id
    }

    equals(other: EnemyId): boolean {
        return other.value === this.value
    }
}
