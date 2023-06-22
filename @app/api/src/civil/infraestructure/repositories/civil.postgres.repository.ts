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
import { Character } from 'src/heroe/infraestructure/models/postgres/character.entity'

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
        @InjectRepository(Character)
        private readonly characterDB: Repository<Character>,
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
                firstApparition: new Date(),
            }),
            ['id'],
        )
        await this.characterDB.upsert(
            this.characterDB.create({
                id: aggregate.id.value,
                personId: aggregate.person.id.value,
                kind: 'civil',
            }),
            ['id'],
        )
        console.log('here')
        await this.civilDB.upsert(
            this.civilDB.create({
                id: aggregate.id.value,
                idRelation: aggregate.relation.targetId,
            }),
            ['id'],
        )
    }

    async delete(aggregate: Civil): Promise<void> {
        await this.civilDB.delete({
            id: aggregate.id.value,
        })
        await this.characterDB.delete({
            id: aggregate.id.value,
        })
    }

    async getById(id: CivilId): Promise<Optional<Civil>> {
        const civil = await this.civilDB
            .createQueryBuilder('civil')
            .innerJoinAndSelect('civil.character', 'character')
            .innerJoinAndSelect('civil.relation', 'relation')
            .where('civil.id = :id', {
                id: id.value,
            })
            .getOne()
        if (!civil) return null
        return new Civil(
            id,
            (await this.getPersonById(new PersonId(civil.character.personId)))!,
            new CivilRelationship(civil.idRelation, civil.relation.kind),
        )
    }

    async getAll(): Promise<Civil[]> {
        const civils = await this.civilDB
            .createQueryBuilder('civil')
            .innerJoinAndSelect('civil.character', 'character')
            .innerJoinAndSelect('character.person', 'person')
            .innerJoinAndSelect('civil.relation', 'relation')
            .getMany()
        return civils.asyncMap(async (e) => {
            const person = e.character.person
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
                new CivilRelationship(e.idRelation, e.relation.kind),
            )
        })
    }

    async getByCriteria(criteria: SearchByCriteriaDTO): Promise<Civil[]> {
        const civils = await this.civilDB
            .createQueryBuilder('civil')
            .limit(criteria.pagination?.limit || 10)
            .skip(
                (criteria.pagination?.page || 1) -
                    1 * (criteria.pagination?.limit || 0),
            )
            .innerJoinAndSelect('civil.id', 'character')
            .innerJoinAndSelect('civil.idRelation', 'relation')
            .where('civil.character.person.name = :name', {
                name: criteria.term,
            })
            .getMany()
        return civils.asyncMap(async (e) => {
            const person = e.character.person
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
                new CivilRelationship(e.idRelation, e.relation.kind),
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
