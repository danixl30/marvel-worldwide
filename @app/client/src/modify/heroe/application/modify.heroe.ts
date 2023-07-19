import { ApplicationService } from '../../../core/application/service/application-service'
import {
    HeroeRepository,
    ModifyHeroeDTO,
} from '../../../heroe/application/repositories/heroe.repository'

export const modifyHeroeApplicationService = (
    heroeRepository: HeroeRepository,
): ApplicationService<ModifyHeroeDTO, void> => {
    const execute = (data: ModifyHeroeDTO) => heroeRepository.modify(data)

    return {
        execute,
    }
}
