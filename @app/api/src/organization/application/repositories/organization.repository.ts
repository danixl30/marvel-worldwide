import { Optional } from '@mono/types-utils'
import { SearchByCriteriaDTO } from 'src/civil/application/repositories/types/search.criteria.dto'
import { Repository } from 'src/core/application/repository/repository'
import { HeroeId } from 'src/heroe/domain/value-object/heroe.id'
import { Headquarter } from 'src/organization/domain/entities/headquarter/hearquarter'
import { HeadquarterId } from 'src/organization/domain/entities/headquarter/value-objects/headquarter.id'
import { HeadquarterPlace } from 'src/organization/domain/entities/headquarter/value-objects/headquarter.place'
import { Organization } from 'src/organization/domain/organization'
import { OrganizationId } from 'src/organization/domain/value-objects/organization.id'
import { VillainId } from 'src/villain/domain/value-object/villain.id'

export interface OrganizationRepository
    extends Repository<OrganizationId, Organization> {
    getHeadquarterByLocation(
        location: HeadquarterPlace,
    ): Promise<Optional<Headquarter>>
    getHeadquarterById(id: HeadquarterId): Promise<Optional<Headquarter>>
    getByCriteria(criteria: SearchByCriteriaDTO): Promise<Organization[]>
    getIfHeroeOrVillainIsLeader(id: HeroeId | VillainId): Promise<boolean>
}
