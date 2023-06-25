import { ApplicationService } from '../../core/application/service/application-service'
import {
    GetHeroesThatHaveArtificialPowersAndLeaderResponse,
    HeroeRepository,
} from '../../heroe/application/repositories/heroe.repository'
import {
    GetVillainsThatHaveArtificialPowersAndLeaderResponse,
    VillainRepository,
} from '../../villain/application/repositories/villain.repository'

export const getHeroesVillainsWithArtificialPowersAndLeader = (
    heroeRepository: HeroeRepository,
    villainRepository: VillainRepository,
): ApplicationService<
    undefined,
    {
        heroes: GetHeroesThatHaveArtificialPowersAndLeaderResponse
        villains: GetVillainsThatHaveArtificialPowersAndLeaderResponse
    }
> => {
    const execute = async () => {
        const heroes =
            await heroeRepository.getHeroesWithArtificialPowersAndLeader()
        const villains =
            await villainRepository.getVillainsWithArtificialPowersAndLeader()
        return {
            heroes,
            villains,
        }
    }

    return {
        execute,
    }
}
