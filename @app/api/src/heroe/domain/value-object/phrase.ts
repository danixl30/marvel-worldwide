import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class HeroePhrase implements ValueObject<HeroePhrase> {
    private constructor(private readonly phrase: string) {
        if (!phrase) throw new Error('Inavlid phrase')
    }

    public get value(): string {
        return this.phrase
    }

    equals(other: HeroePhrase): boolean {
        return other.phrase === this.phrase
    }
}
