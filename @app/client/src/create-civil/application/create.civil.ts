import {
    CivilRepository,
    CreateCivilDTO,
} from '../../civil/application/repositories/civil.repository'
import { ApplicationService } from '../../core/application/service/application-service'

export const createCivilApplicationService = (
    civilRepository: CivilRepository,
): ApplicationService<CreateCivilDTO, void> => {
    const execute = (data: CreateCivilDTO) => civilRepository.create(data)

    return {
        execute,
    }
}
