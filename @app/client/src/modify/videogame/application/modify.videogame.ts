import { ApplicationService } from '../../../core/application/service/application-service'
import {
    ModifyVideogameDTO,
    VideogameRepository,
} from '../../../videogames/application/repositories/videogame.repository'

export const modifyVideogameApplicationService = (
    videogameRepository: VideogameRepository,
): ApplicationService<ModifyVideogameDTO, void> => {
    const execute = (data: ModifyVideogameDTO) =>
        videogameRepository.modify(data)

    return {
        execute,
    }
}
