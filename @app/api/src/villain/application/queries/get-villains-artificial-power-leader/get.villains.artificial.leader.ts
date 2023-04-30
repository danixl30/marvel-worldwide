import { ApplicationService } from 'src/core/application/service/application.service'
import { ApplicationError } from 'src/core/application/error/application.error'
import { Result } from 'src/core/application/result-handler/result.handler'
import { PowerType } from 'src/heroe/domain/entities/power/value-objects/power.type'
import { GetVillainsThatHaveArtificialPowersAndLeaderResponse } from './types/response'
import { VillainRepository } from '../../repositories/villain.repository'
import { OrganizationRepository } from 'src/organization/application/repositories/organization.repository'

export class GetVillainsThatHaveArtificialPowersAndLeaderQuery
    implements
        ApplicationService<
            undefined,
            GetVillainsThatHaveArtificialPowersAndLeaderResponse,
            ApplicationError
        >
{
    constructor(
        private readonly villainRepository: VillainRepository,
        private readonly organizationRepository: OrganizationRepository,
    ) {}

    async execute(): Promise<
        Result<
            GetVillainsThatHaveArtificialPowersAndLeaderResponse,
            ApplicationError
        >
    > {
        const heroes = await this.villainRepository.getVillainsByPowerType(
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
