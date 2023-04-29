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

    changeName(name: PersonName) {
        this._name = name
    }

    changeGender(gender: PersonGender) {
        this._gender = gender
    }

    changeMaritialStatus(status: MaritialStatus) {
        this._maritialStatus = status
    }

    changeHair(hair: PersonHair) {
        this._hair = hair
    }

    changeEyes(eyes: PersonEye) {
        this._eye = eyes
    }

    addOccupation(occupation: PersonOccupation) {
        if (this.occupations.find((e) => e.equals(occupation)))
            throw new Error('occupation already exist')
        this._occupations.push(occupation)
    }

    removeOccupation(occupation: PersonOccupation) {
        this._occupations = this._occupations.filter(
            (e) => !e.equals(occupation),
        )
    }

    addNationality(nationality: PersonNationality) {
        if (this.nationalites.find((e) => e.equals(nationality)))
            throw new Error('Nationality already exist')
        this._nationalities.push(nationality)
    }

    removeNationality(nationality: PersonNationality) {
        this._nationalities = this._nationalities.filter(
            (e) => !e.equals(nationality),
        )
    }
}
