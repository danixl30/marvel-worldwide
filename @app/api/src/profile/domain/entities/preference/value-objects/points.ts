import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class PreferencePoints implements ValueObject<PreferencePoints> {
    constructor(private readonly points: number) {}

    get value() {
        return this.points
    }

    equals(other: PreferencePoints): boolean {
        return other.value === this.value
    }
}
