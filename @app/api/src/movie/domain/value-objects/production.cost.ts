import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class ProductionCost implements ValueObject<ProductionCost> {
    constructor(
        private readonly _cost: number,
        private readonly _earning: number,
    ) {
        if (!this.cost || !this.earning)
            throw new Error('Production cost cannot be null')
        if (this.cost <= 0)
            throw new Error('Movie cost must be greater than zero')
        if (this.earning <= 0)
            throw new Error('Movie earning must be greater than zero')
    }

    get cost() {
        return this._cost
    }

    get earning() {
        return this._earning
    }

    get value() {
        return this.earning - this.cost
    }

    equals(other: ProductionCost): boolean {
        return this.cost === other.cost && this.earning === other.earning
    }
}
