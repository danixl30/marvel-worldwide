import { Optional } from '@mono/types-utils'
import { Combat } from 'src/combat/domain/combat'
import { Character } from 'src/combat/domain/entities/character/character'
import { CharacterId } from 'src/combat/domain/entities/character/value-objects/id'
import { CombatId } from 'src/combat/domain/value-objects/id'
import { Repository } from 'src/core/application/repository/repository'

export interface CombatRepository extends Repository<CombatId, Combat> {
    getCharacterById(id: CharacterId): Promise<Optional<Character>>
}
