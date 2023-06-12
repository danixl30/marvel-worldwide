import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common'
import { ProfilePostgresRepository } from '../repositories/profile.postgres.repository'
import { User } from 'src/user/model/user'
import { ProfileId } from 'src/profile/domain/value-objects/profile.id'

@Injectable()
export class ProfileGuard implements CanActivate {
    constructor(private profileRepository: ProfilePostgresRepository) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest()
        const user = req.user as User
        if (!user) throw new UnauthorizedException()
        if (
            !user.profiles.find((e) =>
                e.equals(new ProfileId(req.headers.profile)),
            )
        )
            throw new UnauthorizedException()
        const profile = await this.profileRepository.getById(
            new ProfileId(req.headers.profile),
        )
        if (!profile) throw new UnauthorizedException()
        req.profile = profile
        return true
    }
}
