import { Entity } from 'src/core/domain/entity/entity'
import { HistoryEnd } from './value-objects/end'
import { HistoryId } from './value-objects/id'
import { HistoryTarget } from './value-objects/target'
import { HistoryTimestamp } from './value-objects/timestamp'

export class History extends Entity<HistoryId> {
    constructor(
        id: HistoryId,
        private _target: HistoryTarget,
        private _timestamp = new HistoryTimestamp(),
        private _end?: HistoryEnd,
    ) {
        super(id)
    }

    get target() {
        return this._target
    }

    get timestamp() {
        return this._timestamp
    }

    get end() {
        return this._end
    }

    get duration() {
        if (!this.end) throw new Error('history is not completed')
        return this.timestamp.seconds - this.end.seconds
    }

    endHistory(end = new HistoryEnd()) {
        this._end = end
    }
}
