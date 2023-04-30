import { Entity } from 'src/core/domain/entity/entity'
import { RateCalification } from './value-objects/rate.calification'
import { RateId } from './value-objects/rate.id'
import { RateTimestamp } from './value-objects/rate.timestamp'

export class Rate extends Entity<RateId> {
    constructor(
        id: RateId,
        private _calification: RateCalification,
        private _timestamp = new RateTimestamp(),
    ) {
        super(id)
    }

    get calification() {
        return this._calification
    }

    get timestamp() {
        return this._timestamp
    }
}
