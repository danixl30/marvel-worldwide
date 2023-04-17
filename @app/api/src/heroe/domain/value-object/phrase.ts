import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class HeroePhrase implements ValueObject<HeroePhrase> {
    private constructor(private readonly phrase: string) {}

    public get value(): string {
        return this.phrase
    }

    equals(other: HeroePhrase): boolean {
        return other.phrase === this.phrase
    }
}
