import { Optional } from '@mono/types-utils'
import { CivilRepository } from 'src/civil/application/repositories/civil.repository'
import { SearchByCriteriaDTO } from 'src/civil/application/repositories/types/search.criteria.dto'
import { Civil } from 'src/civil/domain/civil'
import { CivilId } from 'src/civil/domain/value-objects/id'
import { Person } from 'src/heroe/domain/entities/person/person'
import { PersonId } from 'src/heroe/domain/entities/person/value-objects/id'
import { PersonName } from 'src/heroe/domain/entities/person/value-objects/name'
import { Civil as CivilDB } from '../models/postgres/civil.entity'
import { Person as PersonDB } from 'src/heroe/infraestructure/models/postgres/person.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { CivilRelationship } from 'src/civil/domain/value-objects/relationship'
import { Nationality } from 'src/heroe/infraestructure/models/postgres/nationality.entity'
import { Ocupation as OcupationDB } from 'src/heroe/infraestructure/models/postgres/ocupation.entity'
import { PersonGender } from 'src/heroe/domain/entities/person/value-objects/gender'
import { MaritialStatus } from 'src/heroe/domain/entities/person/value-objects/maritial.status'
import { PersonHair } from 'src/heroe/domain/entities/person/value-objects/hair'
import { PersonEye } from 'src/heroe/domain/entities/person/value-objects/eyes'
import { PersonOccupation } from 'src/heroe/domain/entities/person/value-objects/occupation'
import { PersonNationality } from 'src/heroe/domain/entities/person/value-objects/nationality'
import { Phrase } from 'src/heroe/domain/entities/person/value-objects/phrase'
import { Injectable } from '@nestjs/common'

@Injectable()
export class CivilPostgresRepository implements CivilRepository {
    constructor(
        @InjectRepository(CivilDB)
        private readonly civilDB: Repository<CivilDB>,
        @InjectRepository(PersonDB)
        private readonly personDB: Repository<PersonDB>,
        @InjectRepository(Nationality)
        private readonly nationalityDB: Repository<Nationality>,
        @InjectRepository(OcupationDB)
        private readonly ocupationDB: Repository<OcupationDB>,
    ) {}
    async save(aggregate: Civil): Promise<void> {
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
            }),
            ['id'],
        )
        await this.civilDB.upsert(
            this.civilDB.create({
                id: aggregate.id.value,
                personId: aggregate.person.id.value,
                idVillain:
                    aggregate.relation.kind === 'villain'
                        ? aggregate.relation.targetId
                        : undefined,
                idHeroe:
                    aggregate.relation.kind === 'heroe'
                        ? aggregate.relation.targetId
                        : undefined,
            }),
            ['id'],
        )
    }

    async delete(aggregate: Civil): Promise<void> {
        await this.civilDB.delete({
            id: aggregate.id.value,
        })
    }

    async getById(id: CivilId): Promise<Optional<Civil>> {
        const civil = await this.civilDB.findOneBy({
            id: id.value,
        })
        if (!civil) return null
        return new Civil(
            id,
            (await this.getPersonById(new PersonId(civil.personId)))!,
            new CivilRelationship(
                civil.idHeroe || civil.idVillain,
                civil.idHeroe ? 'heroe' : 'villain',
            ),
        )
    }

    async getByCriteria(criteria: SearchByCriteriaDTO): Promise<Civil[]> {
        const civils = await this.civilDB
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
        return civils.asyncMap(async (e) => {
            const person = e.person
            const ocupations = await this.ocupationDB.findBy({
                idPerson: person.id,
            })
            const nationalities = await this.nationalityDB.findBy({
                idPerson: person.id,
            })
            return new Civil(
                new CivilId(e.id),
                new Person(
                    new PersonId(person.id),
                    new PersonName(person.firstName, person.lastName),
                    new PersonGender(person.gender),
                    new Phrase(person.phrase),
                    new MaritialStatus(person.maritialState),
                    new PersonHair(person.hairColor),
                    new PersonEye(person.eyesColor),
                    ocupations.map((e) => new PersonOccupation(e.name)),
                    nationalities.map((e) => new PersonNationality(e.name)),
                ),
                new CivilRelationship(
                    e.idHeroe || e.idVillain,
                    e.idHeroe ? 'heroe' : 'villain',
                ),
            )
        })
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
}
