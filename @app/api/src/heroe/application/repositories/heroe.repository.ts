import { Optional } from '@mono/types-utils'
import { Repository } from 'src/core/application/repository/repository'
import { Person } from 'src/heroe/domain/entities/person/person'
import { PersonName } from 'src/heroe/domain/entities/person/value-objects/name'
import { Heroe } from 'src/heroe/domain/heroe'
import { HeroeId } from 'src/heroe/domain/value-object/heroe.id'

export interface HeroeRepository extends Repository<HeroeId, Heroe> {
    getPersonByName(name: PersonName): Promise<Optional<Person>>
}
