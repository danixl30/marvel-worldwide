import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class Slogan implements ValueObject<Slogan> {
    constructor(private readonly slogan: string) {}

    get value(): string {
        return this.slogan
    }

    equals(other: Slogan): boolean {
        return other.value === this.value
    }
}
