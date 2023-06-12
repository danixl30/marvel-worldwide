import { ControllerContract } from 'src/core/infraestructure/controllers/controller-model/controller.contract'
import { GetProfilesResponse } from 'src/user/application/queries/get-profiles/types/response'
import { User } from 'src/user/model/user'
import { UserPostgresRepository } from '../../repositories/user.postgres.repository'
import { ProfilePostgresRepository } from 'src/profile/infraestructure/repositories/profile.postgres.repository'
import { GetProfilesQuery } from 'src/user/application/queries/get-profiles/get.profiles'
import { GetProfileByIdQuery } from 'src/profile/application/queries/get-profile-by-id/get.profile.id.query'
import { Controller, Get, UseGuards } from '@nestjs/common'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { USER_ROUTE, USER_TAG } from '../prefix'
import { AuthCuard } from '../../guards/auth.guard'
import { GetUser } from '../../decorators/get.user'

@Controller(USER_ROUTE)
@ApiTags(USER_TAG)
export class GetUserProfilesController
    implements ControllerContract<User, GetProfilesResponse>
{
    constructor(
        private userRepository: UserPostgresRepository,
        private profileRepository: ProfilePostgresRepository,
    ) {}

    @Get('profiles')
    @ApiHeader({ name: 'auth' })
    @UseGuards(AuthCuard)
    async execute(@GetUser() user: User): Promise<GetProfilesResponse> {
        const resp = await new GetProfilesQuery(
            this.userRepository,
            new GetProfileByIdQuery(this.profileRepository),
        ).execute({
            userId: user.id,
        })
        return resp.unwrap()
    }
}
