import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class Logo implements ValueObject<Logo> {
    constructor(private readonly logo: string) {
        if (!logo) throw new Error('Invalid logo')
    }

    get value() {
        return this.logo
    }

    equals(other: Logo): boolean {
        return other.value === this.value
    }
}
