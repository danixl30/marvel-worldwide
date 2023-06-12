import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common'
import { UserPostgresRepository } from '../repositories/user.postgres.repository'
import { JwtProviderService } from 'src/core/infraestructure/token/jwt/service/jwt.provider.service'
import { TokenPayload } from 'src/user/application/queries/login/types/payload'

@Injectable()
export class AuthCuard implements CanActivate {
    constructor(
        private userRepository: UserPostgresRepository,
        private tokenFactory: JwtProviderService,
    ) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const tokenProvider = this.tokenFactory.create<TokenPayload>()
        const req = context.switchToHttp().getRequest()
        try {
            const data = tokenProvider.verify(req.headers.auth)
            const user = await this.userRepository.getById(data.id)
            if (!user) throw new Error()
            req.user = user
        } catch (e) {
            throw new UnauthorizedException()
        }
        return true
    }
}
