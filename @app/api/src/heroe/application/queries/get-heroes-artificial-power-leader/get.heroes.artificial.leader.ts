import { ApplicationService } from 'src/core/application/service/application.service'
import { GetHeroesThatHaveArtificialPowersAndLeaderResponse } from './types/response'
import { ApplicationError } from 'src/core/application/error/application.error'
import { HeroeRepository } from '../../repositories/heroe.repository'
import { OrganizationRepository } from 'src/organization/application/repositories/organization.repository'
import { Result } from 'src/core/application/result-handler/result.handler'
import { PowerType } from 'src/heroe/domain/entities/power/value-objects/power.type'

export class GetHeroesThatHaveArtificialPowersAndLeaderQuery
    implements
        ApplicationService<
            undefined,
            GetHeroesThatHaveArtificialPowersAndLeaderResponse,
            ApplicationError
        >
{
    constructor(
        private readonly heroeRepository: HeroeRepository,
        private readonly organizationRepository: OrganizationRepository,
    ) {}

    async execute(): Promise<
        Result<
            GetHeroesThatHaveArtificialPowersAndLeaderResponse,
            ApplicationError
        >
    > {
        const heroes = await this.heroeRepository.getHeroesByPowerType(
            new PowerType('artificial'),
        )
        const heroesFiltered = await heroes.asyncFilter(async (heroe) => {
            const isLeader =
                await this.organizationRepository.getIfHeroeOrVillainIsLeader(
                    heroe.id,
                )
            return isLeader
        })
        return Result.success(
            heroesFiltered.map((e) => ({
                id: e.id.value,
                name: e.name.value,
            })),
        )
    }
}
