import { Optional } from '@mono/types-utils'
import { InjectRepository } from '@nestjs/typeorm'
import { SearchByCriteriaDTO } from 'src/civil/application/repositories/types/search.criteria.dto'
import { ObjectItem } from 'src/heroe/domain/entities/object/object'
import { ObjectId } from 'src/heroe/domain/entities/object/value-objects/object.id'
import { Person } from 'src/heroe/domain/entities/person/person'
import { PersonId } from 'src/heroe/domain/entities/person/value-objects/id'
import { PersonName } from 'src/heroe/domain/entities/person/value-objects/name'
import { Power } from 'src/heroe/domain/entities/power/power'
import { PowerId } from 'src/heroe/domain/entities/power/value-objects/power.id'
import { PowerType } from 'src/heroe/domain/entities/power/value-objects/power.type'
import { VillainRepository } from 'src/villain/application/repositories/villain.repository'
import { VillainId } from 'src/villain/domain/value-object/villain.id'
import { Villain } from 'src/villain/domain/villain'
import { DataSource, Repository } from 'typeorm'
import { Villain as VillainDB } from '../models/postgres/villain.entity'
import { Person as PersonDB } from 'src/heroe/infraestructure/models/postgres/person.entity'
import { Power as PowerDB } from 'src/heroe/infraestructure/models/postgres/power.entity'
import { ObjectItem as ObjectItemDB } from 'src/heroe/infraestructure/models/postgres/object.entity'
import { Own } from 'src/heroe/infraestructure/models/postgres/own.entity'
import { Use } from 'src/heroe/infraestructure/models/postgres/use.entity'
import { Nationality } from 'src/heroe/infraestructure/models/postgres/nationality.entity'
import { Ocupation as OcupationDB } from 'src/heroe/infraestructure/models/postgres/ocupation.entity'
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
import { VillainName } from 'src/villain/domain/value-object/name'
import { VillainObjetive } from 'src/villain/domain/value-object/objetive'
import { Antagonist } from '../models/postgres/antagonist.entity'
import { AntagonistGroup } from '../models/postgres/antagonist.group.entity'
import { Enemy } from 'src/villain/domain/value-object/heroe.enemy'
import { EnemyGroup } from 'src/villain/domain/value-object/heroe.group.enemy'
import { Phrase } from 'src/heroe/domain/entities/person/value-objects/phrase'
import { Logo } from 'src/heroe/domain/value-object/logo'
import { Injectable } from '@nestjs/common'

@Injectable()
export class VillainPostgresRepository implements VillainRepository {
    constructor(
        @InjectRepository(VillainDB)
        private readonly villainDB: Repository<VillainDB>,
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
        @InjectRepository(Own)
        private readonly ownDB: Repository<Own>,
        @InjectRepository(Antagonist)
        private readonly antagonistDB: Repository<Antagonist>,
        @InjectRepository(AntagonistGroup)
        private readonly antagonistGroupDB: Repository<AntagonistGroup>,
        private dataSource: DataSource,
    ) {}

    async save(aggregate: Villain): Promise<void> {
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
        await this.villainDB.upsert(
            this.villainDB.create({
                id: aggregate.id.value,
                name: aggregate.name.value,
                logo: aggregate.logo.value,
                objetive: aggregate.objetive.value,
                personId: aggregate.person.id.value,
            }),
            ['id'],
        )
        await this.ownDB.delete({
            idVillain: aggregate.id.value,
        })
        await this.useDB.delete({
            idVillain: aggregate.id.value,
        })
        await this.antagonistDB.delete({
            idVillain: aggregate.id.value,
        })
        await this.antagonistGroupDB.delete({
            idVillain: aggregate.id.value,
        })
        await aggregate.powers.asyncForEach((power) =>
            this.ownDB.insert(
                this.ownDB.create({
                    idVillain: aggregate.id.value,
                    idPower: power.id.value,
                }),
            ),
        )
        await aggregate.objects.asyncForEach((object) =>
            this.useDB.insert(
                this.useDB.create({
                    idVillain: aggregate.id.value,
                    idObject: object.id.value,
                }),
            ),
        )
        await aggregate.enemies.asyncForEach((enemy) =>
            this.antagonistDB.insert(
                this.antagonistDB.create({
                    idHeroe: enemy.value,
                    idVillain: aggregate.id.value,
                }),
            ),
        )
        await aggregate.enemieGroups.asyncForEach((group) =>
            this.antagonistGroupDB.insert(
                this.antagonistGroupDB.create({
                    idVillain: aggregate.id.value,
                    idOrganization: group.value,
                }),
            ),
        )
    }

    async delete(aggregate: Villain): Promise<void> {
        await this.villainDB.delete({
            id: aggregate.id.value,
        })
        await this.ownDB.delete({
            idVillain: aggregate.id.value,
        })
        await this.useDB.delete({
            idVillain: aggregate.id.value,
        })
        await this.antagonistDB.delete({
            idVillain: aggregate.id.value,
        })
        await this.antagonistGroupDB.delete({
            idVillain: aggregate.id.value,
        })
    }

    async getById(id: VillainId): Promise<Optional<Villain>> {
        const villain = await this.villainDB.findOneBy({
            id: id.value,
        })
        if (!villain) return null
        const person = await this.getPersonById(new PersonId(villain.personId))
        if (!person) throw new Error('Person not found')
        const objects = await this.useDB
            .createQueryBuilder('use')
            .innerJoinAndSelect('use.objectItem', 'object')
            .where('use.idVillain = :idVi', {
                idVi: villain.id,
            })
            .getMany()
        const antagonists = await this.antagonistDB.findBy({
            idVillain: villain.id,
        })
        const enemyGroups = await this.antagonistGroupDB.findBy({
            idVillain: villain.id,
        })
        const powers = await this.ownDB
            .createQueryBuilder('own')
            .innerJoinAndSelect('own.power', 'power')
            .where('own.idVillain = :idVi', {
                idVi: villain.id,
            })
            .getMany()
        return new Villain(
            id,
            new VillainName(villain.name),
            person,
            new VillainObjetive(villain.objetive),
            new Logo(villain.logo),
            antagonists.map((e) => new Enemy(e.idHeroe)),
            enemyGroups.map((e) => new EnemyGroup(e.idOrganization)),
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

    async getSuperInheritedPowersUsedAtLeast2(): Promise<Power[]> {
        return []
    }

    async getByCriteria(criteria: SearchByCriteriaDTO): Promise<Villain[]> {
        const villains = await this.villainDB
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
        return villains.asyncMap(async (villain) => {
            const person = await this.getPersonById(
                new PersonId(villain.personId),
            )
            if (!person) throw new Error('Person not found')
            const objects = await this.useDB
                .createQueryBuilder('use')
                .innerJoinAndSelect('use.objectItem', 'object')
                .where('use.idVillain = :idVi', {
                    idVi: villain.id,
                })
                .getMany()
            const antagonists = await this.antagonistDB.findBy({
                idVillain: villain.id,
            })
            const enemyGroups = await this.antagonistGroupDB.findBy({
                idVillain: villain.id,
            })
            const powers = await this.ownDB
                .createQueryBuilder('own')
                .innerJoinAndSelect('own.power', 'power')
                .where('own.idVillain = :idVi', {
                    idVi: villain.id,
                })
                .getMany()
            return new Villain(
                new VillainId(villain.id),
                new VillainName(villain.name),
                person,
                new VillainObjetive(villain.objetive),
                new Logo(villain.logo),
                antagonists.map((e) => new Enemy(e.idHeroe)),
                enemyGroups.map((e) => new EnemyGroup(e.idOrganization)),
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

    async getVillainsByPowerType(type: PowerType): Promise<Villain[]> {
        const villains = await this.villainDB
            .createQueryBuilder()
            .limit(5)
            .innerJoinAndSelect(Own, 'own', 'own.idCharcter = Villain.id')
            .innerJoinAndSelect(PowerDB, 'power', 'power.id = own.idPower')
            .where('power.type = :type', {
                type: type.value,
            })
            .getMany()
        return villains.asyncMap(async (villain) => {
            const person = await this.getPersonById(
                new PersonId(villain.personId),
            )
            if (!person) throw new Error('Person not found')
            const objects = await this.useDB
                .createQueryBuilder('use')
                .innerJoinAndSelect('use.objectItem', 'object')
                .where('use.idVillain = :idVi', {
                    idVi: villain.id,
                })
                .getMany()
            const antagonists = await this.antagonistDB.findBy({
                idVillain: villain.id,
            })
            const enemyGroups = await this.antagonistGroupDB.findBy({
                idVillain: villain.id,
            })
            const powers = await this.ownDB
                .createQueryBuilder('own')
                .innerJoinAndSelect('own.power', 'power')
                .where('own.idVillain = :idVi', {
                    idVi: villain.id,
                })
                .getMany()
            return new Villain(
                new VillainId(villain.id),
                new VillainName(villain.name),
                person,
                new VillainObjetive(villain.objetive),
                new Logo(villain.logo),
                antagonists.map((e) => new Enemy(e.idHeroe)),
                enemyGroups.map((e) => new EnemyGroup(e.idOrganization)),
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
