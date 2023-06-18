import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class CombatDate implements ValueObject<CombatDate> {
    constructor(private readonly date: Date) {
        if (!date) throw new Error('Date cannot be null')
    }

    get value() {
        return this.date
    }

    equals(other: CombatDate): boolean {
        return other.value.getTime() === this.date.getTime()
    }
}
