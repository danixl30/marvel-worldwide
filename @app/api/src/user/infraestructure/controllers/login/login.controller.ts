import { ControllerContract } from 'src/core/infraestructure/controllers/controller-model/controller.contract'
import { LoginDTO } from './dto/login.dto'
import { LoginResponse } from 'src/user/application/queries/login/types/response'
import { UserPostgresRepository } from '../../repositories/user.postgres.repository'
import { Sha256Service } from 'src/core/infraestructure/crypto/sha256/service/sha256.service'
import { Login } from 'src/user/application/queries/login/login.user'
import { JwtProviderService } from 'src/core/infraestructure/token/jwt/service/jwt.provider.service'
import { TokenPayload } from 'src/user/application/queries/login/types/payload'
import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { USER_ROUTE, USER_TAG } from '../prefix'

@Controller(USER_ROUTE)
@ApiTags(USER_TAG)
export class LoginController
    implements ControllerContract<LoginDTO, LoginResponse>
{
    constructor(
        private userRepository: UserPostgresRepository,
        private crypto: Sha256Service,
        private tokenFactory: JwtProviderService,
    ) {}

    @Post('login')
    @HttpCode(200)
    async execute(@Body() data: LoginDTO): Promise<LoginResponse> {
        try {
            const resp = await new Login(
                this.userRepository,
                this.crypto,
                this.tokenFactory.create<TokenPayload>(),
            ).execute(data)
            return resp.unwrap()
        } catch (e) {
            console.log(e)
            throw e
        }
    }
}
