import { AggregateRoot } from 'src/core/domain/aggregates/aggregate.root'
import { Enemy } from './value-object/heroe.enemy'
import { EnemyGroup } from './value-object/heroe.group.enemy'
import { InvalidVillainException } from './exceptions/invalid.villain'
import { ObjectItem } from 'src/heroe/domain/entities/object/object'
import { Person } from 'src/heroe/domain/entities/person/person'
import { Power } from 'src/heroe/domain/entities/power/power'
import { VillainCreatedEvent } from './events/villain.created'
import { VillainId } from './value-object/villain.id'
import { VillainName } from './value-object/name'
import { VillainObjetive } from './value-object/objetive'
import { PersonName } from 'src/heroe/domain/entities/person/value-objects/name'
import { PersonGender } from 'src/heroe/domain/entities/person/value-objects/gender'
import { MaritialStatus } from 'src/heroe/domain/entities/person/value-objects/maritial.status'
import { PersonHair } from 'src/heroe/domain/entities/person/value-objects/hair'
import { PersonEye } from 'src/heroe/domain/entities/person/value-objects/eyes'
import { PersonOccupation } from 'src/heroe/domain/entities/person/value-objects/occupation'
import { PersonNationality } from 'src/heroe/domain/entities/person/value-objects/nationality'
import { PowerId } from 'src/heroe/domain/entities/power/value-objects/power.id'
import { PowerName } from 'src/heroe/domain/entities/power/value-objects/power.name'
import { PowerDescription } from 'src/heroe/domain/entities/power/value-objects/power.description'
import { PowerType } from 'src/heroe/domain/entities/power/value-objects/power.type'
import { ObjectId } from 'src/heroe/domain/entities/object/value-objects/object.id'
import { ObjectName } from 'src/heroe/domain/entities/object/value-objects/object.name'
import { ObjectDescription } from 'src/heroe/domain/entities/object/value-objects/object.description'
import { ObjectKind } from 'src/heroe/domain/entities/object/value-objects/object.kind'
import { ObjectMaterial } from 'src/heroe/domain/entities/object/value-objects/object.material'
import { ObjectCreator } from 'src/heroe/domain/entities/object/value-objects/object.creator'

export class Villain extends AggregateRoot<VillainId> {
    constructor(
        id: VillainId,
        private _name: VillainName,
        private _person: Person,
        private _objective: VillainObjetive,
        private _enemies: Enemy[] = [],
        private _enemieGroups: EnemyGroup[] = [],
        private _powers: Power[] = [],
        private _objects: ObjectItem[],
    ) {
        super(id)
        this.publish(new VillainCreatedEvent(id, this.name, this.person, this.objetive, this.enemies, this.enemieGroups, this.powers, this.objects))
    }

    get name() {
        return this._name
    }

    get person() {
        return this._person
    }

    get objetive() {
        return this._objective
    }

    get enemies() {
        return this._enemies
    }

    get enemieGroups() {
        return this._enemieGroups
    }

    get powers() {
        return this._powers
    }

    get objects() {
        return this._objects
    }

    changeName(name: VillainName) {
        this._name = name
    }

    changeObjetive(objetive: VillainObjetive) {
        this._objective = objetive
    }

    addEnemy(enemy: Enemy) {
        if (this.enemies.find((e) => e.equals(enemy))) throw new Error('Enemy already exist')
        this._enemies.push(enemy)
    }

    removeEnemy(group: EnemyGroup) {
        if (this.enemieGroups.find((e) => e.equals(group))) throw new Error('Enemy group already exist')
        this._enemieGroups.push(group)
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

    validateState(): void {
        if (!this.id || !this.name || !this.person || !this.objetive) throw new InvalidVillainException()
    }
}
