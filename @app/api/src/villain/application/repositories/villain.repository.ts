import { Optional } from '@mono/types-utils'
import { Repository } from 'src/core/application/repository/repository'
import { Person } from 'src/heroe/domain/entities/person/person'
import { PersonName } from 'src/heroe/domain/entities/person/value-objects/name'
import { VillainId } from 'src/villain/domain/value-object/villain.id'
import { Villain } from 'src/villain/domain/villain'

export interface VillainRepository extends Repository<VillainId, Villain> {
    getPersonByName(name: PersonName): Promise<Optional<Person>>
}
