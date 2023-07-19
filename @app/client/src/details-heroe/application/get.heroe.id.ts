import { ApplicationService } from '../../core/application/service/application-service'
import {
    GetHeroeByIdResponse,
    HeroeRepository,
} from '../../heroe/application/repositories/heroe.repository'

export const getHeroeByIdApplicationService = (
    heroeRepository: HeroeRepository,
): ApplicationService<string, GetHeroeByIdResponse> => {
    const execute = (id: string) => heroeRepository.getById(id)

    return {
        execute,
    }
}
