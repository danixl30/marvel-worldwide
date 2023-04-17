import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class VideogameCreator implements ValueObject<VideogameCreator> {
    constructor(private readonly name: string) {}

    get value() {
        return this.name
    }

    equals(other: VideogameCreator): boolean {
        return other.value === this.value
    }
}
