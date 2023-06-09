import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class HeroeName implements ValueObject<HeroeName> {
    constructor(private readonly name: string) {
        if (!name) throw new Error('Hero Name cannot be null')
    }

    public get value(): string {
        return this.name
    }

    equals(other: HeroeName): boolean {
        return other.name === this.name
    }
}
