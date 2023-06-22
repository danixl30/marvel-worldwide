import { ControllerContract } from 'src/core/infraestructure/controllers/controller-model/controller.contract'
import { AddRateDTO } from './dto/dto'
import { Profile } from 'src/profile/domain/profile'
import { AddRateResponse } from 'src/profile/application/commands/add-rate/types/response'
import { ProfilePostgresRepository } from '../../repositories/profile.postgres.repository'
import { EventHandlerNative } from 'src/core/infraestructure/event-handler/native/service/event.hadler.native.service'
import { AddRateCommand } from 'src/profile/application/commands/add-rate/add.rate'
import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { PROFILE_ROUTE, PROFILE_TAG } from '../prefix'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { AuthCuard } from 'src/user/infraestructure/guards/auth.guard'
import { ProfileGuard } from '../../guards/profile.guard'
import { GetProfile } from '../../decorators/get.profile'

@Controller(PROFILE_ROUTE)
@ApiTags(PROFILE_TAG)
export class AddRateController
    implements ControllerContract<AddRateDTO | Profile, AddRateResponse>
{
    constructor(
        private profileRepository: ProfilePostgresRepository,
        private eventHandler: EventHandlerNative,
    ) {}

    @Post('rate')
    @ApiHeader({ name: 'auth' })
    @ApiHeader({ name: 'profile' })
    @UseGuards(AuthCuard, ProfileGuard)
    async execute(
        @Body() data: AddRateDTO,
        @GetProfile() profile: Profile,
    ): Promise<AddRateResponse> {
        const resp = await new AddRateCommand(
            this.profileRepository,
            this.eventHandler,
        ).execute({
            ...data,
            profileId: profile.id.value,
        })
        return resp.unwrap()
    }
}
