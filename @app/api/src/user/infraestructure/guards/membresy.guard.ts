import {
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { User, UserTypes } from 'src/user/model/user'

export class MembersyGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const user = context.switchToHttp().getRequest().user as User
        if (!user) throw new UnauthorizedException()
        const membresies = this.reflector.get<UserTypes[]>(
            'membrsies',
            context.getHandler(),
        )
        return Boolean(membresies.find((e) => user.membreship.type === e))
    }
}
