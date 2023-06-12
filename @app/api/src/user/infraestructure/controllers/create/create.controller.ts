import { ControllerContract } from 'src/core/infraestructure/controllers/controller-model/controller.contract'
import { CreateUserDTO } from './dto/create.dto'
import { CreateUserResponse } from 'src/user/application/commands/create/types/response'
import { UserPostgresRepository } from '../../repositories/user.postgres.repository'
import { ConcreteUUIDGenerator } from 'src/core/infraestructure/UUID/service/concrete.UUID.generator'
import { Sha256Service } from 'src/core/infraestructure/crypto/sha256/service/sha256.service'
import { CreateUserCommand } from 'src/user/application/commands/create/create.user'
import { USER_ROUTE, USER_TAG } from '../prefix'
import { Body, Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@Controller(USER_ROUTE)
@ApiTags(USER_TAG)
export class CreateUserController
    implements ControllerContract<CreateUserDTO, CreateUserResponse>
{
    constructor(
        private userRepository: UserPostgresRepository,
        private uuidGen: ConcreteUUIDGenerator,
        private crypto: Sha256Service,
    ) {}

    @Post('create')
    async execute(@Body() data: CreateUserDTO): Promise<CreateUserResponse> {
        const resp = await new CreateUserCommand(
            this.userRepository,
            this.uuidGen,
            this.crypto,
        ).execute(data)
        return resp.unwrap()
    }
}
