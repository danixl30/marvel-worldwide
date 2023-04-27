import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { regExpUUID } from 'src/utils/reg-exps/UUID'

export class Enemy implements ValueObject<Enemy> {
    constructor(private readonly _id: string) {
        if (!regExpUUID.test(_id)) throw new Error('Invalid enemy id')
    }

    public get value(): string {
        return this._id
    }

    equals(other: Enemy): boolean {
        return other.value === this.value
    }
}
