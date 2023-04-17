import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class SerieSynopsis implements ValueObject<SerieSynopsis> {
    constructor(private readonly synopsis: string) {}

    get value() {
        return this.synopsis
    }

    equals(other: SerieSynopsis): boolean {
        return other.value === this.value
    }
}
