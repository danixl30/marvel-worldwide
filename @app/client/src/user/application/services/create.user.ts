import { ApplicationService } from '../../../core/application/service/application-service'
import { UserRepository } from '../user.repository'
import { CreateUserDTO } from './dto/create.user.dto'

export const CreateUserService = (
    userRepository: UserRepository,
): ApplicationService<CreateUserDTO, void> => {
    const execute = (data: CreateUserDTO) => userRepository.create(data)
    return {
        execute,
    }
}
