import { ApplicationService } from '../../core/application/service/application-service'
import {
    CreateHeroeDTO,
    HeroeRepository,
} from '../../heroe/application/repositories/heroe.repository'

export const createHeroeApplicationService = (
    heroeRepository: HeroeRepository,
): ApplicationService<CreateHeroeDTO, void> => {
    const execute = (data: CreateHeroeDTO) => heroeRepository.create(data)

    return {
        execute,
    }
}
