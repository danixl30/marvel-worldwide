import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { regExpUUID } from 'src/utils/reg-exps/UUID'

export class Enemy implements ValueObject<Enemy> {
    constructor(private readonly _id: string, private readonly _name: string) {
        if (!regExpUUID.test(this.id) || !this.name)
            throw new Error('Invalid enemy id')
    }

    get id() {
        return this._id
    }

    get name() {
        return this._name
    }

    public get value(): string {
        return this.id
    }

    equals(other: Enemy): boolean {
        return other.value === this.value
    }
}
