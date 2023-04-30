import { Optional } from '@mono/types-utils'
import { Civil } from 'src/civil/domain/civil'
import { CivilId } from 'src/civil/domain/value-objects/id'
import { Repository } from 'src/core/application/repository/repository'
import { Person } from 'src/heroe/domain/entities/person/person'
import { PersonId } from 'src/heroe/domain/entities/person/value-objects/id'
import { PersonName } from 'src/heroe/domain/entities/person/value-objects/name'
import { SearchByCriteriaDTO } from './types/search.criteria.dto'

export interface CivilRepository extends Repository<CivilId, Civil> {
    getPersonByName(name: PersonName): Promise<Optional<Person>>
    getPersonById(id: PersonId): Promise<Optional<Person>>
    getByCriteria(criteria: SearchByCriteriaDTO): Promise<Civil[]>
}
