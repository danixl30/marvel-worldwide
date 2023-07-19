import { ControllerContract } from 'src/core/infraestructure/controllers/controller-model/controller.contract'
import { CreateCivilResponse } from 'src/civil/application/commands/create-civil/types/response'
import { CivilPostgresRepository } from '../../repositories/civil.postgres.repository'
import { EventHandlerNative } from 'src/core/infraestructure/event-handler/native/service/event.hadler.native.service'
import { Body, Controller, Put, UseGuards } from '@nestjs/common'
import { CIVIL_ROUTE, CIVIL_TAG } from '../prefix'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { Membresies } from 'src/user/infraestructure/metadata/membresy.metadata'
import { UserTypes } from 'src/user/model/user'
import { AuthCuard } from 'src/user/infraestructure/guards/auth.guard'
import { MembersyGuard } from 'src/user/infraestructure/guards/membresy.guard'
import { ModifyCivilDTO } from './dto/dto'
import { ModifyCivilCommand } from 'src/civil/application/commands/modify-civil/modify.civil'

@Controller(CIVIL_ROUTE)
@ApiTags(CIVIL_TAG)
export class ModifyCivilController
    implements ControllerContract<ModifyCivilDTO, CreateCivilResponse>
{
    constructor(
        private civilRepository: CivilPostgresRepository,
        private eventHandler: EventHandlerNative,
    ) {}

    @Put('modify')
    @ApiHeader({ name: 'auth' })
    @Membresies(UserTypes.VIP)
    @UseGuards(AuthCuard, MembersyGuard)
    async execute(@Body() data: ModifyCivilDTO): Promise<CreateCivilResponse> {
        const resp = await new ModifyCivilCommand(
            this.civilRepository,
            this.eventHandler,
        ).execute(data)
        return resp.unwrap()
    }
}
