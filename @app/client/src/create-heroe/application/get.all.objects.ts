import { ApplicationService } from '../../core/application/service/application-service'
import {
    HeroeRepository,
    ObjectList,
} from '../../heroe/application/repositories/heroe.repository'

export const getAllObjectsApplicationService = (
    heroeRepository: HeroeRepository,
): ApplicationService<undefined, ObjectList[]> => {
    const execute = () => heroeRepository.getAllObjects()

    return {
        execute,
    }
}
