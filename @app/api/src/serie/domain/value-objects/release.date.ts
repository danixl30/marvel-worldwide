import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class ReleaseDate implements ValueObject<ReleaseDate> {
    constructor(private readonly date: Date) {
        if (!date) throw new Error('Invalid release date')
    }

    get value() {
        return this.date
    }

    equals(other: ReleaseDate): boolean {
        return other.value.getTime() === this.value.getTime()
    }
}
