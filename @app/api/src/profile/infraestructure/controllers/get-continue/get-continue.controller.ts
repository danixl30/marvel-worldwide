import { ControllerContract } from 'src/core/infraestructure/controllers/controller-model/controller.contract'
import { GetContinueResponse } from 'src/profile/application/queries/get-continue/types/response'
import { Profile } from 'src/profile/domain/profile'
import { ProfilePostgresRepository } from '../../repositories/profile.postgres.repository'
import { GetContinueQuery } from 'src/profile/application/queries/get-continue/get.continue'
import { Controller, Get, UseGuards } from '@nestjs/common'
import { PROFILE_ROUTE, PROFILE_TAG } from '../prefix'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { AuthCuard } from 'src/user/infraestructure/guards/auth.guard'
import { ProfileGuard } from '../../guards/profile.guard'
import { GetProfile } from '../../decorators/get.profile'

@Controller(PROFILE_ROUTE)
@ApiTags(PROFILE_TAG)
export class GetContinueSectionController
    implements ControllerContract<Profile, GetContinueResponse>
{
    constructor(private profileRepository: ProfilePostgresRepository) {}

    @Get('continue')
    @ApiHeader({ name: 'auth' })
    @ApiHeader({ name: 'profile' })
    @UseGuards(AuthCuard, ProfileGuard)
    async execute(
        @GetProfile() profile: Profile,
    ): Promise<GetContinueResponse> {
        const resp = await new GetContinueQuery(this.profileRepository).execute(
            {
                id: profile.id.value,
            },
        )
        return resp.unwrap()
    }
}
