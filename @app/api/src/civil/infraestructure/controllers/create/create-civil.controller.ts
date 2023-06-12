import { ControllerContract } from 'src/core/infraestructure/controllers/controller-model/controller.contract'
import { CreateCivilDTO } from './dto/create.dto'
import { CreateCivilResponse } from 'src/civil/application/commands/create-civil/types/response'
import { CivilPostgresRepository } from '../../repositories/civil.postgres.repository'
import { EventHandlerNative } from 'src/core/infraestructure/event-handler/native/service/event.hadler.native.service'
import { CreateCivilCommand } from 'src/civil/application/commands/create-civil/create.civil'
import { ConcreteUUIDGenerator } from 'src/core/infraestructure/UUID/service/concrete.UUID.generator'
import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { CIVIL_ROUTE, CIVIL_TAG } from '../prefix'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { Membresies } from 'src/user/infraestructure/metadata/membresy.metadata'
import { UserTypes } from 'src/user/model/user'
import { AuthCuard } from 'src/user/infraestructure/guards/auth.guard'
import { MembersyGuard } from 'src/user/infraestructure/guards/membresy.guard'

@Controller(CIVIL_ROUTE)
@ApiTags(CIVIL_TAG)
export class CreateCivilController
    implements ControllerContract<CreateCivilDTO, CreateCivilResponse>
{
    constructor(
        private civilRepository: CivilPostgresRepository,
        private eventHandler: EventHandlerNative,
        private uuidGen: ConcreteUUIDGenerator,
    ) {}

    @Post('create')
    @ApiHeader({ name: 'auth' })
    @Membresies(UserTypes.VIP)
    @UseGuards(AuthCuard, MembersyGuard)
    async execute(@Body() data: CreateCivilDTO): Promise<CreateCivilResponse> {
        const resp = await new CreateCivilCommand(
            this.civilRepository,
            this.uuidGen,
            this.eventHandler,
        ).execute(data)
        return resp.unwrap()
    }
}
