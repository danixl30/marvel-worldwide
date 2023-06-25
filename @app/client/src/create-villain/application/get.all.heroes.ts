import { ApplicationService } from '../../core/application/service/application-service'
import {
    HeroeList,
    HeroeRepository,
} from '../../heroe/application/repositories/heroe.repository'

export const getAllHeroesApplicationService = (
    heroeRepository: HeroeRepository,
): ApplicationService<undefined, HeroeList[]> => {
    const execute = () => heroeRepository.getAll()

    return {
        execute,
    }
}
