import { AggregateRoot } from 'src/core/domain/aggregates/aggregate.root'
import { CivilCreatedEvent } from './events/civil.created'
import { CivilId } from './value-objects/id'
import { CivilRelationship } from './value-objects/relationship'
import { InvalidCivilException } from './exceptions/invalid.civil'
import { MaritialStatus } from 'src/heroe/domain/entities/person/value-objects/maritial.status'
import { Person } from 'src/heroe/domain/entities/person/person'
import { PersonEye } from 'src/heroe/domain/entities/person/value-objects/eyes'
import { PersonGender } from 'src/heroe/domain/entities/person/value-objects/gender'
import { PersonHair } from 'src/heroe/domain/entities/person/value-objects/hair'
import { PersonName } from 'src/heroe/domain/entities/person/value-objects/name'
import { PersonNationality } from 'src/heroe/domain/entities/person/value-objects/nationality'
import { PersonOccupation } from 'src/heroe/domain/entities/person/value-objects/occupation'
import { CivilDeletedEvent } from './events/civil.deleted'

export class Civil extends AggregateRoot<CivilId> {
    constructor(id: CivilId, private _person: Person, private _relation: CivilRelationship) {
        super(id)
        this.publish(new CivilCreatedEvent(id, this.person, this.relation))
    }

    get person() {
        return this._person
    }

    get relation() {
        return this._relation
    }

    changeRelationship(relation: CivilRelationship) {
        this._relation = relation
    }

    changeName(name: PersonName) {
        this.person.changeName(name)
    }

    changeGender(gender: PersonGender) {
        this.person.changeGender(gender)
    }

    changeMaritialStatus(status: MaritialStatus) {
        this.person.changeMaritialStatus(status)
    }

    changeHair(hair: PersonHair) {
        this.person.changeHair(hair)
    }

    changeEyes(eyes: PersonEye) {
        this.person.changeEyes(eyes)
    }

    addOccupation(occupation: PersonOccupation) {
        this.person.addOccupation(occupation)
    }

    removeOccupation(occupation: PersonOccupation) {
        this.person.removeOccupation(occupation)
    }

    addNationality(nationality: PersonNationality) {
        this.person.addNationality(nationality)
    }

    removeNationality(nationality: PersonNationality) {
        this.person.removeNationality(nationality)
    }

    delete() {
        this.publish(new CivilDeletedEvent(this.id))
    }

    validateState(): void {
        if (!this.id || !this.person || !this.relation) throw new InvalidCivilException()
    }
}
