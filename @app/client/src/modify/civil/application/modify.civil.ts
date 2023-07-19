import {
    CivilRepository,
    ModifyCivilDTO,
} from '../../../civil/application/repositories/civil.repository'
import { ApplicationService } from '../../../core/application/service/application-service'

export const modifyCivilApplicationService = (
    civilRepository: CivilRepository,
): ApplicationService<ModifyCivilDTO, void> => {
    const execute = (data: ModifyCivilDTO) => civilRepository.modify(data)

    return {
        execute,
    }
}
