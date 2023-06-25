import { ApplicationService } from '../../core/application/service/application-service'
import {
    CreateVideogameDTO,
    VideogameRepository,
} from '../../videogames/application/repositories/videogame.repository'

export const createVideogameApplicationService = (
    videogameRepository: VideogameRepository,
): ApplicationService<CreateVideogameDTO, void> => {
    const execute = async (data: CreateVideogameDTO) => {
        await videogameRepository.create(data)
    }

    return {
        execute,
    }
}
