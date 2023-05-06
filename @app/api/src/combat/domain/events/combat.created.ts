import { DomainEvent } from 'src/core/domain/events/event'
import { CombatId } from '../value-objects/id'
import { CombatPlace } from '../value-objects/place'
import { CombatDate } from '../value-objects/date'
import { Character } from '../entities/character/character'

export class CombatCreatedEvent extends DomainEvent {
    constructor(
        private _id: CombatId,
        private _place: CombatPlace,
        private _date: CombatDate,
        private _characters: Character[],
    ) {
        super()
    }

    get id() {
        return this._id
    }

    get place() {
        return this._place
    }

    get date() {
        return this._date
    }

    get characters() {
        return this._characters
    }
}
