import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class VillainObjetive implements ValueObject<VillainObjetive> {
    private constructor(private readonly phrase: string) {
        if (!phrase) throw new Error('Invalid phrase')
    }

    public get value(): string {
        return this.phrase
    }

    equals(other: VillainObjetive): boolean {
        return other.phrase === this.phrase
    }
}
