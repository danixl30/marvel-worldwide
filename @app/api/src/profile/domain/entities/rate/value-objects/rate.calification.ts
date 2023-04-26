import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class RateCalification implements ValueObject<RateCalification> {
    constructor(private readonly calification: number) {
        if (!calification || calification < 1 || calification > 5) throw new Error('Invalid calification')
    }

    get value() {
        return this.calification
    }

    equals(other: RateCalification): boolean {
        return other.value === this.value
    }
}
