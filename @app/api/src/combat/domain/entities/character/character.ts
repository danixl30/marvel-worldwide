import { Entity } from 'src/core/domain/entity/entity'
import { CharacterId } from './value-objects/id'
import { ObjectId } from './value-objects/object'
import { PowerId } from './value-objects/power'

export class Character extends Entity<CharacterId> {
    constructor(
        id: CharacterId,
        private _objects: ObjectId[] = [],
        private _powers: PowerId[] = [],
    ) {
        super(id)
    }

    get powers() {
        return this._powers
    }

    get objects() {
        return this._objects
    }

    changePower(prev: PowerId, current: PowerId) {
        if (this.powers.find((e) => e.equals(current)))
            throw new Error('Power already exist')
        this._powers = this.powers.toReplaced((e) => e.equals(prev), current)
    }

    addPower(power: PowerId) {
        if (this.powers.find((e) => e.equals(power)))
            throw new Error('Power already exist')
        this._powers.push(power)
    }

    removePower(power: PowerId) {
        if (!this.powers.find((e) => e.equals(power)))
            throw new Error('Power not found')
        this._powers = this.powers.filter((e) => !e.equals(power))
    }

    changeObject(prev: ObjectId, current: ObjectId) {
        if (this.objects.find((e) => e.equals(current)))
            throw new Error('Object already exist')
        this._objects = this.objects.toReplaced((e) => e.equals(prev), current)
    }

    addObject(object: ObjectId) {
        if (this.objects.find((e) => e.equals(object)))
            throw new Error('Object already exist')
        this._objects.push(object)
    }

    removeObject(object: ObjectId) {
        if (!this.objects.find((e) => e.equals(object)))
            throw new Error('Object not found')
        this._objects = this.objects.filter((e) => !e.equals(object))
    }
}
