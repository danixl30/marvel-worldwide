import { ApplicationService } from '../../core/application/service/application-service'
import { HeroeRepository } from '../../heroe/application/repositories/heroe.repository'
import { VillainRepository } from '../../villain/application/repositories/villain.repository'

export const getAllHeroesVillainsApplicationService = (
    heroeRepository: HeroeRepository,
    villainRepository: VillainRepository,
): ApplicationService<
    undefined,
    {
        id: string
        name: string
        kind: string
    }[]
> => {
    const execute = async () => {
        const heroes = await heroeRepository.getAll()
        const villains = await villainRepository.getAll()
        return [
            ...heroes.map((e) => ({
                ...e,
                kind: 'heroe',
            })),
            ...villains.map((e) => ({
                ...e,
                kind: 'villain',
            })),
        ]
    }

    return {
        execute,
    }
}
