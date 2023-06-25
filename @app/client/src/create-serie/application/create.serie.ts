import { ApplicationService } from '../../core/application/service/application-service'
import {
    CreateSerieDTO,
    SerieRepository,
} from '../../serie/application/repositories/serie.repository'

export const createSerieApplicationService = (
    serieRepository: SerieRepository,
): ApplicationService<CreateSerieDTO, void> => {
    const execute = (data: CreateSerieDTO) => serieRepository.create(data)

    return {
        execute,
    }
}
