import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { regExpUUID } from 'src/utils/reg-exps/UUID'

export class HeroeId implements ValueObject<HeroeId> {
    constructor(private readonly id: string) {
        if (!regExpUUID.test(id)) throw new Error('Invalid heroe id')
    }

    public get value(): string {
        return this.id
    }

    equals(other: HeroeId): boolean {
        return other.value === this.value
    }
}
