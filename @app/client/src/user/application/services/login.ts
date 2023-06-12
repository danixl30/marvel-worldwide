import { ApplicationService } from '../../../core/application/service/application-service'
import { UserRepository } from '../user.repository'
import { LoginDTO } from './dto/login'

export const LoginService = (
    userRepository: UserRepository,
): ApplicationService<LoginDTO, void> => {
    const execute = (data: LoginDTO) => userRepository.login(data)
    return {
        execute,
    }
}
