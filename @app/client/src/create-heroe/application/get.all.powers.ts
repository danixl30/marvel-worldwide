import { ApplicationService } from '../../core/application/service/application-service'
import {
    HeroeRepository,
    PowerList,
} from '../../heroe/application/repositories/heroe.repository'

export const getAllPowersApplicationService = (
    heroeRepository: HeroeRepository,
): ApplicationService<undefined, PowerList[]> => {
    const execute = () => heroeRepository.getAllPowers()

    return {
        execute,
    }
}
