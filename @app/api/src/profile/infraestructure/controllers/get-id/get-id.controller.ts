import { Controller, Get, UseGuards } from '@nestjs/common'
import { ControllerContract } from 'src/core/infraestructure/controllers/controller-model/controller.contract'
import { GetProfileByIdResponse } from 'src/profile/application/queries/get-profile-by-id/types/response'
import { Profile } from 'src/profile/domain/profile'
import { PROFILE_ROUTE, PROFILE_TAG } from '../prefix'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { AuthCuard } from 'src/user/infraestructure/guards/auth.guard'
import { ProfileGuard } from '../../guards/profile.guard'
import { GetProfile } from '../../decorators/get.profile'

@Controller(PROFILE_ROUTE)
@ApiTags(PROFILE_TAG)
export class GetProfileByIDController
    implements ControllerContract<Profile, GetProfileByIdResponse>
{
    @Get('detail')
    @ApiHeader({ name: 'auth' })
    @ApiHeader({ name: 'profile' })
    @UseGuards(AuthCuard, ProfileGuard)
    async execute(
        @GetProfile() profile: Profile,
    ): Promise<GetProfileByIdResponse> {
        return {
            id: profile.id.value,
            language: profile.language.value,
            email: profile.email.value,
            history: profile.history.map((e) => ({
                id: e.id.value,
                targetId: e.target.postId,
            })),
            preferences: profile.preferences.map((e) => ({
                id: e.id.value,
                kind: e.target.kind,
                platform: e.target.platform,
            })),
            rates: profile.rates.map((e) => ({
                id: e.id.value,
                kind: e.kind.value,
                calification: e.calification.value,
            })),
        }
    }
}
