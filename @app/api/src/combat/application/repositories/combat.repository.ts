import { SearchByCriteriaDTO } from 'src/civil/application/repositories/types/search.criteria.dto'
import { Combat } from 'src/combat/domain/combat'
import { CombatId } from 'src/combat/domain/value-objects/id'
import { CombatPlace } from 'src/combat/domain/value-objects/place'
import { Repository } from 'src/core/application/repository/repository'

export interface CombatRepository extends Repository<CombatId, Combat> {
    getTop3Locations(): Promise<CombatPlace[]>
    getByCriteria(criteria: SearchByCriteriaDTO): Promise<Combat[]>
}
