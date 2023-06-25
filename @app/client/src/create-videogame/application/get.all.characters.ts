import { CivilRepository } from '../../civil/application/repositories/civil.repository'
import { ApplicationService } from '../../core/application/service/application-service'
import { HeroeRepository } from '../../heroe/application/repositories/heroe.repository'
import { VillainRepository } from '../../villain/application/repositories/villain.repository'

export const getAllCharactersApplicationService = (
    civilRepository: CivilRepository,
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
        const civils = await civilRepository.getAll()
        const heroes = await heroeRepository.getAll()
        const villains = await villainRepository.getAll()
        return [
            ...civils.map((e) => ({
                ...e,
                kind: 'civil',
            })),
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
