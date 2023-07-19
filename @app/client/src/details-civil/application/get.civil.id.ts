import {
    CivilRepository,
    GetCivilByIdResponse,
} from '../../civil/application/repositories/civil.repository'
import { ApplicationService } from '../../core/application/service/application-service'

export const getCivilByIdApplicationService = (
    civilRepository: CivilRepository,
): ApplicationService<string, GetCivilByIdResponse> => {
    const execute = (id: string) => civilRepository.getById(id)

    return {
        execute,
    }
}
