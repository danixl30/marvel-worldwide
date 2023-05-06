import { ApplicationError } from 'src/core/application/error/application.error'
import { ApplicationService } from 'src/core/application/service/application.service'
import { CombatRepository } from '../../repositories/combat.repository'
import { Result } from 'src/core/application/result-handler/result.handler'

export class GetTop3CombatPlacesQuery
    implements ApplicationService<undefined, string[], ApplicationError>
{
    constructor(private readonly combatRepository: CombatRepository) {}

    async execute(): Promise<Result<string[], ApplicationError>> {
        const places = await this.combatRepository.getTop3Locations()
        return Result.success(places.map((e) => e.value))
    }
}
