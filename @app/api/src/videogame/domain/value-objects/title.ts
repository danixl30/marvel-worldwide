import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class VideogameTitle implements ValueObject<VideogameTitle> {
    constructor(private readonly title: string) {}

    get value() {
        return this.title
    }

    equals(other: VideogameTitle): boolean {
        return other.value === this.value
    }
}
