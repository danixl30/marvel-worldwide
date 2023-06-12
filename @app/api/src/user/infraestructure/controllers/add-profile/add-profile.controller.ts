import { ControllerContract } from 'src/core/infraestructure/controllers/controller-model/controller.contract'
import { User } from 'src/user/model/user'
import { AddProfileDTO } from './dto/add-profile.dto'
import { AddProfileResponse } from 'src/user/application/commands/add-profile/types/response'
import { ProfilePostgresRepository } from 'src/profile/infraestructure/repositories/profile.postgres.repository'
import { UserPostgresRepository } from '../../repositories/user.postgres.repository'
import { ConcreteUUIDGenerator } from 'src/core/infraestructure/UUID/service/concrete.UUID.generator'
import { EventHandlerNative } from 'src/core/infraestructure/event-handler/native/service/event.hadler.native.service'
import { AddProfileCommand } from 'src/user/application/commands/add-profile/add.profile.user'
import { CreateProfileCommand } from 'src/profile/application/commands/create-profile/create.profile.command'
import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { USER_ROUTE, USER_TAG } from '../prefix'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { AuthCuard } from '../../guards/auth.guard'
import { GetUser } from '../../decorators/get.user'

@Controller(USER_ROUTE)
@ApiTags(USER_TAG)
export class AddProfileController
    implements ControllerContract<User | AddProfileDTO, AddProfileResponse>
{
    constructor(
        private profileRepository: ProfilePostgresRepository,
        private userRepository: UserPostgresRepository,
        private uuidGen: ConcreteUUIDGenerator,
        private eventHandler: EventHandlerNative,
    ) {}

    @Post('add/profile')
    @ApiHeader({ name: 'auth' })
    @UseGuards(AuthCuard)
    async execute(
        @GetUser() user: User,
        @Body() data: AddProfileDTO,
    ): Promise<AddProfileResponse> {
        const resp = await new AddProfileCommand(
            this.userRepository,
            new CreateProfileCommand(
                this.profileRepository,
                this.uuidGen,
                this.eventHandler,
            ),
        ).execute({
            ...data,
            userId: user.id,
        })
        return resp.unwrap()
    }
}
