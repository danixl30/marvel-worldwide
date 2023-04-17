import { ValueObject } from 'src/core/domain/value-objects/value.object'

export enum MaritialStatuses {
    SINGLE = 'S',
    MARRIED = 'M',
    WIDOWER = 'W',
    DIVORCED = 'D',
}

export class MaritialStatus implements ValueObject<MaritialStatus> {
    constructor(private readonly status: MaritialStatuses) {}

    get value() {
        return this.status
    }

    equals(other: MaritialStatus): boolean {
        return other.value === this.value
    }
}