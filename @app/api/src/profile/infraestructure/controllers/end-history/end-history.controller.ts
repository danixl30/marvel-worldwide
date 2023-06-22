import { ControllerContract } from 'src/core/infraestructure/controllers/controller-model/controller.contract'
import { EndHistoryResponse } from 'src/profile/application/commands/end-history/types/response'
import { Profile } from 'src/profile/domain/profile'
import { ProfilePostgresRepository } from '../../repositories/profile.postgres.repository'
import { EventHandlerNative } from 'src/core/infraestructure/event-handler/native/service/event.hadler.native.service'
import { EndHistoryCommand } from 'src/profile/application/commands/end-history/end.history'
import { Controller, Param, Post, UseGuards } from '@nestjs/common'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { AuthCuard } from 'src/user/infraestructure/guards/auth.guard'
import { ProfileGuard } from '../../guards/profile.guard'
import { GetProfile } from '../../decorators/get.profile'
import { PROFILE_ROUTE, PROFILE_TAG } from '../prefix'

@Controller(PROFILE_ROUTE)
@ApiTags(PROFILE_TAG)
export class EndHistoryController
    implements ControllerContract<string | Profile, EndHistoryResponse>
{
    constructor(
        private profileRepository: ProfilePostgresRepository,
        private eventHandler: EventHandlerNative,
    ) {}

    @Post('history/end/:id')
    @ApiHeader({ name: 'auth' })
    @ApiHeader({ name: 'profile' })
    @UseGuards(AuthCuard, ProfileGuard)
    async execute(
        @Param('id') history: string,
        @GetProfile() profile: Profile,
    ): Promise<EndHistoryResponse> {
        const resp = await new EndHistoryCommand(
            this.profileRepository,
            this.eventHandler,
        ).execute({
            history,
            profileId: profile.id.value,
        })
        return resp.unwrap()
    }
}
