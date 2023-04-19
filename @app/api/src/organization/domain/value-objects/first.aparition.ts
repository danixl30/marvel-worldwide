import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { regExpUUID } from 'src/utils/reg-exps/UUID'

export class FirstAparition implements ValueObject<FirstAparition> {
    constructor(private readonly comic: string) {
        if (!regExpUUID.test(comic)) throw new Error('Invalid first apparition')
    }

    get value() {
        return this.comic
    }

    equals(other: FirstAparition): boolean {
        return other.value === this.value
    }
}
