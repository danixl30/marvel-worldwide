import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class Phrase implements ValueObject<Phrase> {
    constructor(private readonly phrase: string) {
        if (!phrase) throw new Error('Invalid phrase')
    }

    public get value(): string {
        return this.phrase
    }

    equals(other: Phrase): boolean {
        return other.phrase === this.phrase
    }
}
