import { ApplicationService } from '../../core/application/service/application-service'
import {
    GetTop5MoreUsedObjectsResponse,
    HeroeRepository,
} from '../../heroe/application/repositories/heroe.repository'

export const getTop5MoreUsedObjectsApplicationService = (
    heroeRepository: HeroeRepository,
): ApplicationService<undefined, GetTop5MoreUsedObjectsResponse> => {
    const execute = () => heroeRepository.getTop5MoreUsedObjects()

    return {
        execute,
    }
}
