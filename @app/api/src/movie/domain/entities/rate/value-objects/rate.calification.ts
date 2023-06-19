import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class RateCalification implements ValueObject<RateCalification> {
    constructor(private readonly calification: number) {
        if (!calification || calification < 1 || calification > 5)
            throw new Error(
                'Calification cannot be null. Also, must be between 1 and 5',
            )
    }

    get value() {
        return this.calification
    }

    equals(other: RateCalification): boolean {
        return other.value === this.value
    }
}
