import { ValueObject } from 'src/core/domain/value-objects/value.object'
import { regExpUUID } from 'src/utils/reg-exps/UUID'

export class ArchEnemy implements ValueObject<ArchEnemy> {
    private constructor(
        private readonly _id: string,
        private readonly _name: string,
    ) {
        if (!regExpUUID.test(this.id) || !this.name)
            throw new Error('Invalid arch enemy id')
    }

    get id() {
        return this._id
    }

    get name() {
        return this._name
    }

    public get value(): string {
        return this.id
    }

    equals(other: ArchEnemy): boolean {
        return other.id === this.id
    }
}
