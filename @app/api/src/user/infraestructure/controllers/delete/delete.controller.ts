import { Controller, Delete, UseGuards } from '@nestjs/common'
import { ControllerContract } from 'src/core/infraestructure/controllers/controller-model/controller.contract'
import { EventHandlerNative } from 'src/core/infraestructure/event-handler/native/service/event.hadler.native.service'
import { DeleteProfileCommand } from 'src/profile/application/commands/delete-profile/delete.profile.command'
import { ProfilePostgresRepository } from 'src/profile/infraestructure/repositories/profile.postgres.repository'
import { DeleteUserCommand } from 'src/user/application/commands/delete/delete.user'
import { DeleteUserDTO } from 'src/user/application/commands/delete/types/dto'
import { DeleteUserResponse } from 'src/user/application/commands/delete/types/response'
import { User } from 'src/user/model/user'
import { USER_ROUTE, USER_TAG } from '../prefix'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { AuthCuard } from '../../guards/auth.guard'
import { GetUser } from '../../decorators/get.user'
import { UserPostgresRepository } from '../../repositories/user.postgres.repository'

@Controller(USER_ROUTE)
@ApiTags(USER_TAG)
export class DeleteUserController
    implements ControllerContract<User, DeleteUserResponse>
{
    constructor(
        private userRepository: UserPostgresRepository,
        private profileRepository: ProfilePostgresRepository,
        private eventHandler: EventHandlerNative,
    ) {}

    @Delete()
    @ApiHeader({ name: 'auth' })
    @UseGuards(AuthCuard)
    async execute(@GetUser() user: User): Promise<DeleteUserDTO> {
        const resp = await new DeleteUserCommand(
            this.userRepository,
            new DeleteProfileCommand(this.profileRepository, this.eventHandler),
        ).execute({
            id: user.id,
        })
        return resp.unwrap()
    }
}
