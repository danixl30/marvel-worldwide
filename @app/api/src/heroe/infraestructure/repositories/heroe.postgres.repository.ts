import { Optional } from '@mono/types-utils'
import { SearchByCriteriaDTO } from 'src/civil/application/repositories/types/search.criteria.dto'
import { HeroeRepository } from 'src/heroe/application/repositories/heroe.repository'
import { ObjectItem } from 'src/heroe/domain/entities/object/object'
import { ObjectId } from 'src/heroe/domain/entities/object/value-objects/object.id'
import { Person } from 'src/heroe/domain/entities/person/person'
import { PersonId } from 'src/heroe/domain/entities/person/value-objects/id'
import { PersonName } from 'src/heroe/domain/entities/person/value-objects/name'
import { Power } from 'src/heroe/domain/entities/power/power'
import { PowerId } from 'src/heroe/domain/entities/power/value-objects/power.id'
import { PowerType } from 'src/heroe/domain/entities/power/value-objects/power.type'
import { Heroe } from 'src/heroe/domain/heroe'
import { HeroeId } from 'src/heroe/domain/value-object/heroe.id'
import { Heroe as HeroeDB } from '../models/postgres/heroe.entity'
import { ObjectItem as ObjectItemDB } from '../models/postgres/object.entity'
import { Power as PowerDB } from '../models/postgres/power.entity'
import { Nationality } from '../models/postgres/nationality.entity'
import { Ocupation as OcupationDB } from '../models/postgres/ocupation.entity'
import { Use } from '../models/postgres/use.entity'
import { Person as PersonDB } from '../models/postgres/person.entity'
import { ColorSuit } from '../models/postgres/suit.color.entity'
import { Own } from '../models/postgres/own.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { PowerName } from 'src/heroe/domain/entities/power/value-objects/power.name'
import { PowerDescription } from 'src/heroe/domain/entities/power/value-objects/power.description'
import { ObjectName } from 'src/heroe/domain/entities/object/value-objects/object.name'
import { ObjectDescription } from 'src/heroe/domain/entities/object/value-objects/object.description'
import { ObjectKind } from 'src/heroe/domain/entities/object/value-objects/object.kind'
import { ObjectMaterial } from 'src/heroe/domain/entities/object/value-objects/object.material'
import { ObjectCreator } from 'src/heroe/domain/entities/object/value-objects/object.creator'
import { PersonGender } from 'src/heroe/domain/entities/person/value-objects/gender'
import { MaritialStatus } from 'src/heroe/domain/entities/person/value-objects/maritial.status'
import { PersonHair } from 'src/heroe/domain/entities/person/value-objects/hair'
import { PersonEye } from 'src/heroe/domain/entities/person/value-objects/eyes'
import { PersonOccupation } from 'src/heroe/domain/entities/person/value-objects/occupation'
import { PersonNationality } from 'src/heroe/domain/entities/person/value-objects/nationality'
import { HeroeName } from 'src/heroe/domain/value-object/name'
import { HeroeCreator } from 'src/heroe/domain/value-object/creator'
import { ArchEnemy } from 'src/heroe/domain/value-object/arch.enemy'
import { Logo } from 'src/heroe/domain/value-object/logo'
import { SuitColor } from 'src/heroe/domain/value-object/suit.color'
import { Phrase } from 'src/heroe/domain/entities/person/value-objects/phrase'
import { Injectable } from '@nestjs/common'

@Injectable()
export class HeroePostgresRepository implements HeroeRepository {
    constructor(
        @InjectRepository(HeroeDB)
        private readonly heroeDB: Repository<HeroeDB>,
        @InjectRepository(PersonDB)
        private readonly personDB: Repository<PersonDB>,
        @InjectRepository(PowerDB)
        private readonly powerDB: Repository<PowerDB>,
        @InjectRepository(ObjectItemDB)
        private readonly objectDB: Repository<ObjectItemDB>,
        @InjectRepository(Nationality)
        private readonly nationalityDB: Repository<Nationality>,
        @InjectRepository(OcupationDB)
        private readonly ocupationDB: Repository<OcupationDB>,
        @InjectRepository(Use)
        private readonly useDB: Repository<Use>,
        @InjectRepository(ColorSuit)
        private readonly colorDB: Repository<ColorSuit>,
        @InjectRepository(Own)
        private readonly ownDB: Repository<Own>,
    ) {}
    async save(aggregate: Heroe): Promise<void> {
        await this.powerDB.upsert(
            aggregate.powers.map((power) => ({
                id: power.id.value,
                name: power.name.value,
                type: power.type.value,
                description: power.description.value,
            })),
            ['id'],
        )
        await this.objectDB.upsert(
            aggregate.objects.map((object) => ({
                id: object.id.value,
                name: object.name.value,
                description: object.description.value,
                creator: object.creator.value,
                material: object.material.value,
                type: object.kind.value,
            })),
            ['id'],
        )
        await this.personDB.upsert(
            this.personDB.create({
                id: aggregate.person.id.value,
                firstName: aggregate.person.name.firstName,
                lastName: aggregate.person.name.lastName,
                gender: aggregate.person.gender.value,
                eyesColor: aggregate.person.eye.value,
                hairColor: aggregate.person.hair.value,
                maritialState: aggregate.person.maritialStatus.value,
                phrase: aggregate.person.phrase.value,
                firstApparition: new Date(),
            }),
            ['id'],
        )
        await this.ocupationDB.delete({
            idPerson: aggregate.person.id.value,
        })
        await this.nationalityDB.delete({
            idPerson: aggregate.person.id.value,
        })
        await aggregate.person.nationalites.asyncForEach(async (nationality) =>
            this.nationalityDB.insert(
                this.nationalityDB.create({
                    idPerson: aggregate.person.id.value,
                    name: nationality.value,
                }),
            ),
        )
        await aggregate.person.occupations.asyncForEach(async (ocupation) =>
            this.ocupationDB.insert(
                this.ocupationDB.create({
                    idPerson: aggregate.person.id.value,
                    name: ocupation.value,
                }),
            ),
        )
        await this.heroeDB.upsert(
            this.heroeDB.create({
                id: aggregate.id.value,
                idArchEnemy: aggregate.archEnemy.value,
                name: aggregate.name.value,
                logo: aggregate.logo.value,
            }),
            ['id'],
        )
        await this.ownDB.delete({
            idHeroe: aggregate.id.value,
        })
        await this.useDB.delete({
            idHeroe: aggregate.id.value,
        })
        await this.colorDB.delete({
            idHeroe: aggregate.id.value,
        })
        await aggregate.powers.asyncMap((power) =>
            this.ownDB.insert(
                this.ownDB.create({
                    idPower: power.id.value,
                    idHeroe: aggregate.id.value,
                }),
            ),
        )
        await aggregate.objects.asyncMap((object) =>
            this.useDB.insert(
                this.useDB.create({
                    idHeroe: aggregate.id.value,
                    idObject: object.id.value,
                }),
            ),
        )
        await aggregate.colors.asyncForEach((color) =>
            this.colorDB.insert(
                this.colorDB.create({
                    idHeroe: aggregate.id.value,
                    color: color.value,
                }),
            ),
        )
    }

    async delete(aggregate: Heroe): Promise<void> {
        await this.heroeDB.delete({
            id: aggregate.id.value,
        })
        await this.ownDB.delete({
            idHeroe: aggregate.id.value,
        })
        await this.useDB.delete({
            idHeroe: aggregate.id.value,
        })
        await this.colorDB.delete({
            idHeroe: aggregate.id.value,
        })
    }

    async getById(id: HeroeId): Promise<Optional<Heroe>> {
        const heroe = await this.heroeDB.findOneBy({
            id: id.value,
        })
        if (!heroe) return null
        const person = await this.getPersonById(new PersonId(heroe.personId))
        if (!person) throw new Error('Person not found')
        const powers = await this.ownDB.findBy({
            idHeroe: id.value,
        })
        const objects = await this.useDB.findBy({
            idHeroe: id.value,
        })
        const colors = await this.colorDB.findBy({
            idHeroe: id.value,
        })
        return new Heroe(
            id,
            new HeroeName(heroe.name),
            person,
            new Logo(heroe.logo),
            new HeroeCreator('', ''),
            new ArchEnemy(heroe.idArchEnemy),
            colors.map((e) => new SuitColor(e.color)),
            powers.map(
                (e) =>
                    new Power(
                        new PowerId(e.idPower),
                        new PowerName(e.power.name),
                        new PowerDescription(e.power.description),
                        new PowerType(e.power.type),
                    ),
            ),
            objects.map(
                (e) =>
                    new ObjectItem(
                        new ObjectId(e.idObject),
                        new ObjectName(e.objectItem.name),
                        new ObjectDescription(e.objectItem.description),
                        new ObjectKind(e.objectItem.type),
                        new ObjectMaterial(e.objectItem.material),
                        new ObjectCreator(e.objectItem.creator),
                    ),
            ),
        )
    }

    async getPowerById(id: PowerId): Promise<Optional<Power>> {
        const power = await this.powerDB.findOneBy({
            id: id.value,
        })
        if (!power) return null
        return new Power(
            new PowerId(power.id),
            new PowerName(power.name),
            new PowerDescription(power.description),
            new PowerType(power.type),
        )
    }

    async getByCriteria(criteria: SearchByCriteriaDTO): Promise<Heroe[]> {
        const heroes = await this.heroeDB
            .createQueryBuilder()
            .limit(criteria.pagination?.limit || 10)
            .skip(
                (criteria.pagination?.page || 1) -
                    1 * (criteria.pagination?.limit || 0),
            )
            .andWhere({
                name: criteria.term,
            })
            .getMany()
        return heroes.asyncMap(async (heroe) => {
            const person = await this.getPersonById(
                new PersonId(heroe.personId),
            )
            if (!person) throw new Error('Person not found')
            const powers = await this.ownDB.findBy({
                idHeroe: heroe.id,
            })
            const objects = await this.useDB.findBy({
                idHeroe: heroe.id,
            })
            const colors = await this.colorDB.findBy({
                idHeroe: heroe.id,
            })
            return new Heroe(
                new HeroeId(heroe.id),
                new HeroeName(heroe.name),
                person,
                new Logo(heroe.logo),
                new HeroeCreator('', ''),
                new ArchEnemy(heroe.idArchEnemy),
                colors.map((e) => new SuitColor(e.color)),
                powers.map(
                    (e) =>
                        new Power(
                            new PowerId(e.idPower),
                            new PowerName(e.power.name),
                            new PowerDescription(e.power.description),
                            new PowerType(e.power.type),
                        ),
                ),
                objects.map(
                    (e) =>
                        new ObjectItem(
                            new ObjectId(e.idObject),
                            new ObjectName(e.objectItem.name),
                            new ObjectDescription(e.objectItem.description),
                            new ObjectKind(e.objectItem.type),
                            new ObjectMaterial(e.objectItem.material),
                            new ObjectCreator(e.objectItem.creator),
                        ),
                ),
            )
        })
    }

    async getObjectById(id: ObjectId): Promise<Optional<ObjectItem>> {
        const object = await this.objectDB.findOneBy({
            id: id.value,
        })
        if (!object) return null
        return new ObjectItem(
            new ObjectId(object.id),
            new ObjectName(object.name),
            new ObjectDescription(object.description),
            new ObjectKind(object.type),
            new ObjectMaterial(object.material),
            new ObjectCreator(object.creator),
        )
    }

    async getTop5MoreUsedObjects(): Promise<ObjectItem[]> {
        return []
    }

    async getPersonById(id: PersonId): Promise<Optional<Person>> {
        const person = await this.personDB.findOneBy({
            id: id.value,
        })
        if (!person) return null
        const ocupations = await this.ocupationDB.findBy({
            idPerson: person.id,
        })
        const nationalities = await this.nationalityDB.findBy({
            idPerson: person.id,
        })
        return new Person(
            new PersonId(person.id),
            new PersonName(person.firstName, person.lastName),
            new PersonGender(person.gender),
            new Phrase(person.phrase),
            new MaritialStatus(person.maritialState),
            new PersonHair(person.hairColor),
            new PersonEye(person.eyesColor),
            ocupations.map((e) => new PersonOccupation(e.name)),
            nationalities.map((e) => new PersonNationality(e.name)),
        )
    }

    async getPersonByName(name: PersonName): Promise<Optional<Person>> {
        const person = await this.personDB.findOneBy({
            firstName: name.firstName,
            lastName: name.lastName,
        })
        if (!person) return null
        const ocupations = await this.ocupationDB.findBy({
            idPerson: person.id,
        })
        const nationalities = await this.nationalityDB.findBy({
            idPerson: person.id,
        })
        return new Person(
            new PersonId(person.id),
            new PersonName(person.firstName, person.lastName),
            new PersonGender(person.gender),
            new Phrase(person.phrase),
            new MaritialStatus(person.maritialState),
            new PersonHair(person.hairColor),
            new PersonEye(person.eyesColor),
            ocupations.map((e) => new PersonOccupation(e.name)),
            nationalities.map((e) => new PersonNationality(e.name)),
        )
    }
    async getHeroesByPowerType(type: PowerType): Promise<Heroe[]> {
        const heroes = await this.heroeDB
            .createQueryBuilder()
            .limit(5)
            .innerJoinAndSelect(Own, 'own', 'own.idCharcter = Heroe.id')
            .innerJoinAndSelect(PowerDB, 'power', 'power.id = own.idPower')
            .where('power.type = :type', {
                type: type.value,
            })
            .getMany()
        return heroes.asyncMap(async (heroe) => {
            const person = await this.getPersonById(
                new PersonId(heroe.personId),
            )
            if (!person) throw new Error('Person not found')
            const powers = await this.ownDB.findBy({
                idHeroe: heroe.id,
            })
            const objects = await this.useDB.findBy({
                idHeroe: heroe.id,
            })
            const colors = await this.colorDB.findBy({
                idHeroe: heroe.id,
            })
            return new Heroe(
                new HeroeId(heroe.id),
                new HeroeName(heroe.name),
                person,
                new Logo(heroe.logo),
                new HeroeCreator('', ''),
                new ArchEnemy(heroe.idArchEnemy),
                colors.map((e) => new SuitColor(e.color)),
                powers.map(
                    (e) =>
                        new Power(
                            new PowerId(e.idPower),
                            new PowerName(e.power.name),
                            new PowerDescription(e.power.description),
                            new PowerType(e.power.type),
                        ),
                ),
                objects.map(
                    (e) =>
                        new ObjectItem(
                            new ObjectId(e.idObject),
                            new ObjectName(e.objectItem.name),
                            new ObjectDescription(e.objectItem.description),
                            new ObjectKind(e.objectItem.type),
                            new ObjectMaterial(e.objectItem.material),
                            new ObjectCreator(e.objectItem.creator),
                        ),
                ),
            )
        })
    }
}
