import { AggregateRoot } from 'src/core/domain/aggregates/aggregate.root'
import { CombatId } from './value-objects/id'
import { CombatPlace } from './value-objects/place'
import { CombatDate } from './value-objects/date'
import { Character } from './entities/character/character'
import { InvalidCombatException } from './exceptions/invalid.combat'
import { CombatCreatedEvent } from './events/combat.created'
import { CombatDeletedEvent } from './events/combat.deleted'

export class Combat extends AggregateRoot<CombatId> {
    constructor(
        id: CombatId,
        private _place: CombatPlace,
        private _date: CombatDate,
        private _characters: Character[],
    ) {
        super(id)
        this.publish(
            new CombatCreatedEvent(id, this.place, this.date, this.characters),
        )
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

    changePlace(place: CombatPlace) {
        this._place = place
    }

    changeDate(date: CombatDate) {
        this._date = date
    }

    delete() {
        this.publish(new CombatDeletedEvent(this.id))
    }

    validateState(): void {
        if (!this.place || !this.date || !this.characters || !this.id)
            throw new InvalidCombatException()
    }
}
