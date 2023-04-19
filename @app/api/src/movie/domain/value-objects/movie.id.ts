import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { regExpUUID } from 'src/utils/reg-exps/UUID'

export class MovieId implements ValueObject<MovieId> {
    constructor(private readonly id: string) {
        if (!regExpUUID.test(id)) throw new Error('Invalid movie id')
    }

    get value() {
        return this.id
    }

    equals(other: MovieId): boolean {
        return other.value === this.value
    }
}
