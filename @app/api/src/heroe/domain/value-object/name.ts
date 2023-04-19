import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class HeroeName implements ValueObject<HeroeName> {
    private constructor(private readonly name: string) {
        if (!name) throw new Error('Inavlid name')
    }

    public get value(): string {
        return this.name
    }

    equals(other: HeroeName): boolean {
        return other.name === this.name
    }
}
