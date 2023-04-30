import { Optional } from '@mono/types-utils'
import { SearchByCriteriaDTO } from 'src/civil/application/repositories/types/search.criteria.dto'
import { Repository } from 'src/core/application/repository/repository'
import { ObjectItem } from 'src/heroe/domain/entities/object/object'
import { ObjectId } from 'src/heroe/domain/entities/object/value-objects/object.id'
import { Person } from 'src/heroe/domain/entities/person/person'
import { PersonId } from 'src/heroe/domain/entities/person/value-objects/id'
import { PersonName } from 'src/heroe/domain/entities/person/value-objects/name'
import { Power } from 'src/heroe/domain/entities/power/power'
import { PowerId } from 'src/heroe/domain/entities/power/value-objects/power.id'
import { Heroe } from 'src/heroe/domain/heroe'
import { HeroeId } from 'src/heroe/domain/value-object/heroe.id'

export interface HeroeRepository extends Repository<HeroeId, Heroe> {
    getPersonByName(name: PersonName): Promise<Optional<Person>>
    getPersonById(id: PersonId): Promise<Optional<Person>>
    getObjectById(id: ObjectId): Promise<Optional<ObjectItem>>
    getPowerById(id: PowerId): Promise<Optional<Power>>
    getByCriteria(criteria: SearchByCriteriaDTO): Promise<Heroe[]>
}
