import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class CombatPlace implements ValueObject<CombatPlace> {
    constructor(private readonly code: string) {
        if (!code) throw new Error('Code cannot be null')
    }

    get value() {
        return this.code
    }

    equals(other: CombatPlace): boolean {
        return other.value === this.value
    }
}
