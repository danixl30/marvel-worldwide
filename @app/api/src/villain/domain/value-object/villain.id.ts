import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { regExpUUID } from 'src/utils/reg-exps/UUID'

export class VillainId implements ValueObject<VillainId> {
    constructor(private readonly id: string) {
        if (!regExpUUID.test(id)) throw new Error('Invalid villain id')
    }

    public get value(): string {
        return this.id
    }

    equals(other: VillainId): boolean {
        return other.value === this.value
    }
}
