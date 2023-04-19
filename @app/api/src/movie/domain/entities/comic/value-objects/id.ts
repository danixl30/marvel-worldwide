import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { regExpUUID } from 'src/utils/reg-exps/UUID'

export class ComicId implements ValueObject<ComicId> {
    constructor(private readonly id: string) {
        if (!regExpUUID.test(id)) throw new Error('Invalid comic id')
    }

    get value() {
        return this.id
    }

    equals(other: ComicId): boolean {
        return other.value === this.value
    }
}
