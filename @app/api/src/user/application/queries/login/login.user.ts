import { ApplicationService } from 'src/core/application/service/application.service'
import { LoginDTO } from './types/dto'
import { LoginResponse } from './types/response'
import { ApplicationError } from 'src/core/application/error/application.error'
import { UserRepository } from '../../repositories/user.repository'
import { Result } from 'src/core/application/result-handler/result.handler'
import { Crypto } from 'src/core/application/crypto/crypto'
import { TokenProvider } from 'src/core/application/token/token.provider'
import { TokenPayload } from './types/payload'

export class Login
    implements ApplicationService<LoginDTO, LoginResponse, ApplicationError>
{
    constructor(
        private readonly userRepository: UserRepository,
        private readonly crypto: Crypto,
        private readonly tokenProvider: TokenProvider<TokenPayload>,
    ) {}

    async execute(
        data: LoginDTO,
    ): Promise<Result<LoginResponse, ApplicationError>> {
        const user = await this.userRepository.getByEmail(data.email)
        if (!user || !(await this.crypto.compare(data.password, user.password)))
            throw new Error('Error in login')
        const token = this.tokenProvider.sign({
            id: user.id,
        })
        return Result.success({
            token,
        })
    }
}
