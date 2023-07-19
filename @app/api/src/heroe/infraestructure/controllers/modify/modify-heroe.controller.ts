import { ControllerContract } from 'src/core/infraestructure/controllers/controller-model/controller.contract'
import { CreateHeroeResponse } from 'src/heroe/application/commands/create/types/response'
import { HeroePostgresRepository } from '../../repositories/heroe.postgres.repository'
import { ConcreteUUIDGenerator } from 'src/core/infraestructure/UUID/service/concrete.UUID.generator'
import { EventHandlerNative } from 'src/core/infraestructure/event-handler/native/service/event.hadler.native.service'
import { Body, Controller, Put, UseGuards } from '@nestjs/common'
import { HEROE_ROUTE, HEROE_TAG } from '../prefix'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { Membresies } from 'src/user/infraestructure/metadata/membresy.metadata'
import { UserTypes } from 'src/user/model/user'
import { MembersyGuard } from 'src/user/infraestructure/guards/membresy.guard'
import { AuthCuard } from 'src/user/infraestructure/guards/auth.guard'
import { ModifyHeroeDTO } from './dto/dto'
import { ModifyHeroeCommand } from 'src/heroe/application/commands/modify/modify.heroe'

@Controller(HEROE_ROUTE)
@ApiTags(HEROE_TAG)
export class ModifyHeroeController
    implements ControllerContract<ModifyHeroeDTO, CreateHeroeResponse>
{
    constructor(
        private heroeRepository: HeroePostgresRepository,
        private uuidGen: ConcreteUUIDGenerator,
        private eventHandler: EventHandlerNative,
    ) {}

    @Put('modify')
    @ApiHeader({ name: 'auth' })
    @Membresies(UserTypes.VIP)
    @UseGuards(AuthCuard, MembersyGuard)
    async execute(@Body() data: ModifyHeroeDTO): Promise<CreateHeroeResponse> {
        const resp = await new ModifyHeroeCommand(
            this.heroeRepository,
            this.uuidGen,
            this.eventHandler,
        ).execute(data)
        return resp.unwrap()
    }
}
