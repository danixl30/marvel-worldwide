import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class HistoryTarget implements ValueObject<HistoryTarget> {
    constructor(
        private readonly _postId: string,
        private readonly _kind: string,
    ) {}

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
