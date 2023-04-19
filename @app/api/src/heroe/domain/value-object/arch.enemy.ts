import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { regExpUUID } from 'src/utils/reg-exps/UUID'

export class ArchEnemy implements ValueObject<ArchEnemy> {
    private constructor(private readonly id: string) {
        if (!regExpUUID.test(id)) throw new Error('Invalid arch enemy id')
    }

    public get value(): string {
        return this.id
    }

    equals(other: ArchEnemy): boolean {
        return other.id === this.id
    }
}
