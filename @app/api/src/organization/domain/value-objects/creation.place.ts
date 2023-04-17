import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class CreationPlace implements ValueObject<CreationPlace> {
    constructor(private readonly place: string) {}

    get value() {
        return this.place
    }

    equals(other: CreationPlace): boolean {
        return other.value === this.value
    }
}
