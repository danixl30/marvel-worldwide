import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { regExpUUID } from 'src/utils/reg-exps/UUID'

export class ObjectId implements ValueObject<ObjectId> {
    constructor(private readonly id: string) {
        if (!regExpUUID.test(id)) throw new Error('Invalid object id')
    }

    get value() {
        return this.id
    }

    equals(other: ObjectId): boolean {
        return other.value === this.value
    }
}
