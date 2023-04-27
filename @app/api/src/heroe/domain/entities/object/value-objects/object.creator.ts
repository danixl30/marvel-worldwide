import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { regExpUUID } from 'src/utils/reg-exps/UUID'

export class ObjectCreator implements ValueObject<ObjectCreator> {
    constructor(private readonly creator: string) {
        if (!regExpUUID.test(creator)) throw new Error('Invalid object creator')
    }

    get value() {
        return this.creator
    }

    equals(other: ObjectCreator): boolean {
        return other.value === this.value
    }
}
