import { ApplicationService } from 'src/core/application/service/application.service'
import { GetCombatByIdDTO } from './types/dto'
import { GetCombatByIdResponse } from './types/response'
import { ApplicationError } from 'src/core/application/error/application.error'
import { CombatRepository } from '../../repositories/combat.repository'
import { Result } from 'src/core/application/result-handler/result.handler'
import { CombatId } from 'src/combat/domain/value-objects/id'
import { CombatNotFoundError } from '../../errors/combat.not.found'
import { HeroeRepository } from 'src/heroe/application/repositories/heroe.repository'
import { VillainRepository } from 'src/villain/application/repositories/villain.repository'
import { CivilRepository } from 'src/civil/application/repositories/civil.repository'
import { CharacterId } from 'src/combat/domain/entities/character/value-objects/id'
import { CivilId } from 'src/civil/domain/value-objects/id'
import { HeroeId } from 'src/heroe/domain/value-object/heroe.id'
import { VillainId } from 'src/villain/domain/value-object/villain.id'

export class GetCombatByIdQuery
    implements
        ApplicationService<
            GetCombatByIdDTO,
            GetCombatByIdResponse,
            ApplicationError
        >
{
    constructor(
        private readonly combatRepository: CombatRepository,
        private readonly heroeRepository: HeroeRepository,
        private readonly villainRepository: VillainRepository,
        private readonly civilRepository: CivilRepository,
    ) {}

    async getHeroeVillainOrCivil(id: CharacterId) {
        const civil = await this.civilRepository.getById(new CivilId(id.value))
        if (civil)
            return {
                id: civil.id.value,
                name: civil.person.name.value,
            }
        const heroe = await this.heroeRepository.getById(new HeroeId(id.value))
        if (heroe)
            return {
                id: heroe.id.value,
                name: heroe.name.value,
            }
        const villain = await this.villainRepository.getById(
            new VillainId(id.value),
        )
        if (villain)
            return {
                id: villain.id.value,
                name: villain.name.value,
            }
        throw new Error('Target not found')
    }

    async execute(
        data: GetCombatByIdDTO,
    ): Promise<Result<GetCombatByIdResponse, ApplicationError>> {
        const combat = await this.combatRepository.getById(
            new CombatId(data.id),
        )
        if (!combat) return Result.error(new CombatNotFoundError())
        return Result.success({
            id: combat.id.value,
            date: combat.date.value,
            place: combat.place.value,
            characters: await combat.characters.asyncMap(async (character) => ({
                id: character.id.value,
                name: (await this.getHeroeVillainOrCivil(character.id)).name,
                powers: character.powers.map((e) => e.value),
                objects: character.objects.map((e) => e.value),
            })),
        })
    }
}
