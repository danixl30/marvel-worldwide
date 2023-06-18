import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { regExpUUID } from 'src/utils/reg-exps/UUID'

export class ArchEnemy implements ValueObject<ArchEnemy> {
    constructor(private readonly _id: string) {
        if (!regExpUUID.test(_id)) throw new Error('Invalid Archenemy id')
    }

    public get value(): string {
        return this._id
    }

    equals(other: ArchEnemy): boolean {
        return other.value === this.value
    }
}
