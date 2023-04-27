import { AggregateRoot } from 'src/core/domain/aggregates/aggregate.root'
import { ArchEnemy } from './value-object/arch.enemy'
import { HeroeCreatedEvent } from './events/heroe.created'
import { HeroeCreator } from './value-object/creator'
import { HeroeId } from './value-object/heroe.id'
import { HeroeName } from './value-object/name'
import { HeroePhrase } from './value-object/phrase'
import { InvalidHeroeException } from './exceptions/invalid.heroe'
import { ObjectItem } from './entities/object/object'
import { Person } from './entities/person/person'
import { Power } from './entities/power/power'
import { PersonName } from './entities/person/value-objects/name'
import { PersonGender } from './entities/person/value-objects/gender'
import { MaritialStatus } from './entities/person/value-objects/maritial.status'
import { PersonHair } from './entities/person/value-objects/hair'
import { PersonEye } from './entities/person/value-objects/eyes'
import { PersonOccupation } from './entities/person/value-objects/occupation'
import { PersonNationality } from './entities/person/value-objects/nationality'
import { PowerId } from './entities/power/value-objects/power.id'
import { ObjectId } from './entities/object/value-objects/object.id'
import { PowerName } from './entities/power/value-objects/power.name'
import { PowerDescription } from './entities/power/value-objects/power.description'
import { PowerType } from './entities/power/value-objects/power.type'
import { ObjectName } from './entities/object/value-objects/object.name'
import { ObjectDescription } from './entities/object/value-objects/object.description'
import { ObjectKind } from './entities/object/value-objects/object.kind'
import { ObjectMaterial } from './entities/object/value-objects/object.material'
import { ObjectCreator } from './entities/object/value-objects/object.creator'
import { HeroeDeletedEvent } from './events/heroe.deleted'

export class Heroe extends AggregateRoot<HeroeId> {
    constructor(
        id: HeroeId,
        private _name: HeroeName,
        private _person: Person,
        private _phrase: HeroePhrase,
        private _creator: HeroeCreator,
        private _archEnemy: ArchEnemy,
        private _powers: Power[] = [],
        private _objects: ObjectItem[] = [],
    ) {
        super(id)
        this.publish(new HeroeCreatedEvent(id, this.name, this.person, this.phrase, this.creator, this.archEnemy, this.powers, this.objects))
    }

    get name() {
        return this._name
    }

    get person() {
        return this._person
    }

    get phrase() {
        return this._phrase
    }

    get creator() {
        return this._creator
    }

    get archEnemy() {
        return this._archEnemy
    }

    get powers() {
        return this._powers
    }

    get objects() {
        return this._objects
    }

    changeName(name: HeroeName) {
        this._name = name
    }

    changePhrase(phrase: HeroePhrase) {
        this._phrase = phrase
    }

    changeCreator(creator: HeroeCreator) {
        this._creator = creator
    }

    changeArchEnemy(archEnemy: ArchEnemy) {
        this._archEnemy = archEnemy
    }

    changePersonName(name: PersonName) {
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

    addPower(power: Power) {
        if (this.powers.find((e) => e.id.equals(power.id))) throw new Error('Power already exist')
        this._powers.push(power)
    }

    changePowerName(id: PowerId, name: PowerName) {
        const power = this.powers.find((e) => e.id.equals(id))
        if (!power) throw new Error('Power not found')
        power.changeName(name)
    }

    changePowerDescription(id: PowerId, description: PowerDescription) {
        const power = this.powers.find((e) => e.id.equals(id))
        if (!power) throw new Error('Power not found')
        power.changeDescription(description)
    }

    changePowerType(id: PowerId, type: PowerType) {
        const power = this.powers.find((e) => e.id.equals(id))
        if (!power) throw new Error('Power not found')
        power.changeType(type)
    }

    removePower(powerId: PowerId) {
        this._powers = this.powers.filter((e) => !e.id.equals(powerId))
    }

    addObject(object: ObjectItem) {
        if (this.objects.find((e) => e.id.equals(object.id))) throw new Error('Object already exist')
        this._objects.push(object)
    }

    changeObjectName(id: ObjectId, name: ObjectName) {
        const object = this.objects.find((e) => e.id.equals(id))
        if (!object) throw new Error('Object not found')
        object.changeName(name)
    }

    changeObjectDescription(id: ObjectId, description: ObjectDescription) {
        const object = this.objects.find((e) => e.id.equals(id))
        if (!object) throw new Error('Object not found')
        object.changeDescription(description)
    }

    changeObjectKind(id: ObjectId, kind: ObjectKind) {
        const object = this.objects.find((e) => e.id.equals(id))
        if (!object) throw new Error('Object not found')
        object.changeKind(kind)
    }

    changeObjectMaterial(id: ObjectId, material: ObjectMaterial) {
        const object = this.objects.find((e) => e.id.equals(id))
        if (!object) throw new Error('Object not found')
        object.changeMaterial(material)
    }

    changeObjectCreator(id: ObjectId, creator: ObjectCreator) {
        const object = this.objects.find((e) => e.id.equals(id))
        if (!object) throw new Error('Object not found')
        object.changeCreator(creator)
    }

    removeObject(objectId: ObjectId) {
        this._objects = this.objects.filter((e) => !e.id.equals(objectId))
    }

    delete() {
        this.publish(new HeroeDeletedEvent(this.id))
    }

    validateState(): void {
        if (!this.id || !this.name || !this.person || !this.phrase || !this.creator || !this.powers || !this.objects || !this.archEnemy)
            throw new InvalidHeroeException()
    }
}
