import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { regExpUUID } from 'src/utils/reg-exps/UUID'

export class HistoryTarget implements ValueObject<HistoryTarget> {
    constructor(
        private readonly _postId: string,
        private readonly _kind: string,
    ) {
        if (!regExpUUID.test(this.postId) || !this.kind)
            throw new Error('Invalid history target')
    }

    get postId() {
        return this._postId
    }

    get kind() {
        return this._kind
    }

    get value() {
        return this.postId + ' ' + this.kind
    }

    equals(other: HistoryTarget): boolean {
        return other.value === this.value
    }
}
