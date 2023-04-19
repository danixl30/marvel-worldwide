import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { regExpUUID } from 'src/utils/reg-exps/UUID'

export class HeroeFirstApparition implements ValueObject<HeroeFirstApparition> {
    constructor(private readonly comic: string) {
        if (!regExpUUID.test(comic)) throw new Error('Invalid first apparition')
    }

    get value() {
        return this.comic
    }

    equals(other: HeroeFirstApparition): boolean {
        return other.value === this.value
    }
}
