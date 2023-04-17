import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class ProductionCost implements ValueObject<ProductionCost> {
    constructor(
        private readonly _cost: number,
        private readonly _earning: number,
    ) {}

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
