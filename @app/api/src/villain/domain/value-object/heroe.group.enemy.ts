import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class EnemyGroup implements ValueObject<EnemyGroup> {
    constructor(private readonly name: string) {
        if (!name) throw new Error('Invalid rival group name')
    }

    public get value(): string {
        return this.name
    }

    equals(other: EnemyGroup): boolean {
        return other.name === this.name
    }
}
