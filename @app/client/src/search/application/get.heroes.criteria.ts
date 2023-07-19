import { GetByCriteriaDTO } from '../../civil/application/repositories/civil.repository'
import { ApplicationService } from '../../core/application/service/application-service'
import {
    GetHeroesByCriteriaResponse,
    HeroeRepository,
} from '../../heroe/application/repositories/heroe.repository'

export const getHeroesByCriteriaApplicationService = (
    heroeRepository: HeroeRepository,
): ApplicationService<GetByCriteriaDTO, GetHeroesByCriteriaResponse> => {
    const execute = (data: GetByCriteriaDTO) =>
        heroeRepository.getByCriteria(data)

    return {
        execute,
    }
}
