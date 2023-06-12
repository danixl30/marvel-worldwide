import { ControllerContract } from 'src/core/infraestructure/controllers/controller-model/controller.contract'
import { CreateHeroeDTO } from './dto/create.dto'
import { CreateHeroeResponse } from 'src/heroe/application/commands/create/types/response'
import { HeroePostgresRepository } from '../../repositories/heroe.postgres.repository'
import { ConcreteUUIDGenerator } from 'src/core/infraestructure/UUID/service/concrete.UUID.generator'
import { EventHandlerNative } from 'src/core/infraestructure/event-handler/native/service/event.hadler.native.service'
import { CreateHeroeCommand } from 'src/heroe/application/commands/create/create.heroe'
import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { HEROE_ROUTE, HEROE_TAG } from '../prefix'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { Membresies } from 'src/user/infraestructure/metadata/membresy.metadata'
import { UserTypes } from 'src/user/model/user'
import { MembersyGuard } from 'src/user/infraestructure/guards/membresy.guard'
import { AuthCuard } from 'src/user/infraestructure/guards/auth.guard'

@Controller(HEROE_ROUTE)
@ApiTags(HEROE_TAG)
export class CreateHeroeController
    implements ControllerContract<CreateHeroeDTO, CreateHeroeResponse>
{
    constructor(
        private heroeRepository: HeroePostgresRepository,
        private uuidGen: ConcreteUUIDGenerator,
        private eventHandler: EventHandlerNative,
    ) {}

    @Post('create')
    @ApiHeader({ name: 'auth' })
    @Membresies(UserTypes.VIP)
    @UseGuards(AuthCuard, MembersyGuard)
    async execute(@Body() data: CreateHeroeDTO): Promise<CreateHeroeResponse> {
        const resp = await new CreateHeroeCommand(
            this.heroeRepository,
            this.uuidGen,
            this.eventHandler,
        ).execute(data)
        return resp.unwrap()
    }
}
