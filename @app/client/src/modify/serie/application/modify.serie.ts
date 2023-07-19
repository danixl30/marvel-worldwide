import { ApplicationService } from '../../../core/application/service/application-service'
import {
    ModifySerieDTO,
    SerieRepository,
} from '../../../serie/application/repositories/serie.repository'

export const modifySerieApplicationService = (
    serieRepository: SerieRepository,
): ApplicationService<ModifySerieDTO, void> => {
    const execute = (data: ModifySerieDTO) => serieRepository.modify(data)

    return {
        execute,
    }
}
