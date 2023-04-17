import { Entity } from 'src/core/domain/entity/entity'
import { MaritialStatus } from './value-objects/maritial.status'
import { PersonEye } from './value-objects/eyes'
import { PersonGender } from './value-objects/gender'
import { PersonHair } from './value-objects/hair'
import { PersonId } from './value-objects/id'
import { PersonName } from './value-objects/name'
import { PersonNationality } from './value-objects/nationality'
import { PersonOccupation } from './value-objects/occupation'

export class Person extends Entity<PersonId> {
    constructor(
        id: PersonId,
        private _name: PersonName,
        private _gender: PersonGender,
        private _occupation: PersonOccupation,
        private _maritialStatus: MaritialStatus,
        private _hair: PersonHair,
        private _eye: PersonEye,
        private _occupations: PersonOccupation[],
        private _nationalities: PersonNationality[],
    ) {
        super(id)
    }

    get name() {
        return this._name
    }

    get gender() {
        return this._gender
    }

    get occupation() {
        return this._occupation
    }

    get maritialStatus() {
        return this._maritialStatus
    }

    get hair() {
        return this._hair
    }

    get eye() {
        return this._eye
    }

    get nationalites() {
        return this._nationalities
    }

    get occupations() {
        return this._occupations
    }
}
