import { ControllerContract } from 'src/core/infraestructure/controllers/controller-model/controller.contract'
import { CreateVideogameResponse } from 'src/videogame/application/commands/create/types/response'
import { VideogamePostgresRepository } from '../../repositories/videogame.postgres.repository'
import { ConcreteUUIDGenerator } from 'src/core/infraestructure/UUID/service/concrete.UUID.generator'
import { EventHandlerNative } from 'src/core/infraestructure/event-handler/native/service/event.hadler.native.service'
import { Body, Controller, Put, UseGuards } from '@nestjs/common'
import { VIDEOGAME_ROUTE, VIDEOGAME_TAG } from '../prefix'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { Membresies } from 'src/user/infraestructure/metadata/membresy.metadata'
import { UserTypes } from 'src/user/model/user'
import { MembersyGuard } from 'src/user/infraestructure/guards/membresy.guard'
import { AuthCuard } from 'src/user/infraestructure/guards/auth.guard'
import { ModifyVideogameDTO } from './dto/dto'
import { ModifyVideogameCommand } from 'src/videogame/application/commands/modify/modify.videogame'

@Controller(VIDEOGAME_ROUTE)
@ApiTags(VIDEOGAME_TAG)
export class ModifyVideogameController
    implements ControllerContract<ModifyVideogameDTO, CreateVideogameResponse>
{
    constructor(
        private videogameRepository: VideogamePostgresRepository,
        private uuidGen: ConcreteUUIDGenerator,
        private eventHandler: EventHandlerNative,
    ) {}

    @Put('modify')
    @ApiHeader({ name: 'auth' })
    @Membresies(UserTypes.VIP)
    @UseGuards(AuthCuard, MembersyGuard)
    async execute(
        @Body() data: ModifyVideogameDTO,
    ): Promise<CreateVideogameResponse> {
        const resp = await new ModifyVideogameCommand(
            this.videogameRepository,
            this.uuidGen,
            this.eventHandler,
        ).execute(data)
        return resp.unwrap()
    }
}
