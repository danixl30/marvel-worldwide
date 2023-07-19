import { ControllerContract } from 'src/core/infraestructure/controllers/controller-model/controller.contract'
import { User } from 'src/user/model/user'
import { Controller, Get, UseGuards } from '@nestjs/common'
import { USER_ROUTE, USER_TAG } from '../prefix'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { AuthCuard } from '../../guards/auth.guard'
import { GetUser } from '../../decorators/get.user'
import { GetUserByIdResponse } from 'src/user/application/queries/get-by-id/types/response'

@Controller(USER_ROUTE)
@ApiTags(USER_TAG)
export class AddProfileController
    implements ControllerContract<User, GetUserByIdResponse>
{
    @Get('details')
    @ApiHeader({ name: 'auth' })
    @UseGuards(AuthCuard)
    async execute(@GetUser() user: User): Promise<GetUserByIdResponse> {
        user.password = ''
        return user
    }
}
