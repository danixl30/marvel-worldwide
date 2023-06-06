import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class Comic implements ValueObject<Comic> {
    constructor(private readonly title: string) {
        if (!title) throw new Error('Invalid comic title')
    }

    get value() {
        return this.title
    }

    equals(other: Comic): boolean {
        return other.value === this.value
    }
}
