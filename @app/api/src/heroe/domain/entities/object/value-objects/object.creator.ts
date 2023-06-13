import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class ObjectCreator implements ValueObject<ObjectCreator> {
    constructor(private readonly creator: string) {
        if (!creator) throw new Error('Invalid object creator')
    }

    get value() {
        return this.creator
    }

    equals(other: ObjectCreator): boolean {
        return other.value === this.value
    }
}
