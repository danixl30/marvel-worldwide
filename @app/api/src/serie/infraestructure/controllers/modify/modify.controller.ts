import { ControllerContract } from 'src/core/infraestructure/controllers/controller-model/controller.contract'
import { CreateSerieResponse } from 'src/serie/application/commands/create/types/response'
import { SeriePostgresRepository } from '../../repositories/serie.postgres.repository'
import { ConcreteUUIDGenerator } from 'src/core/infraestructure/UUID/service/concrete.UUID.generator'
import { EventHandlerNative } from 'src/core/infraestructure/event-handler/native/service/event.hadler.native.service'
import { CerateSerieCommand } from 'src/serie/application/commands/create/create.serie'
import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common'
import { SERIE_ROUTE, SERIE_TAG } from '../prefix'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { Membresies } from 'src/user/infraestructure/metadata/membresy.metadata'
import { UserTypes } from 'src/user/model/user'
import { MembersyGuard } from 'src/user/infraestructure/guards/membresy.guard'
import { AuthCuard } from 'src/user/infraestructure/guards/auth.guard'
import { ModifySerieDTO } from './dto/dto'
import { ModifySerieCommand } from 'src/serie/application/commands/modify/modify.serie'

@Controller(SERIE_ROUTE)
@ApiTags(SERIE_TAG)
export class ModifySerieController
    implements ControllerContract<ModifySerieDTO, CreateSerieResponse>
{
    constructor(
        private serieRepository: SeriePostgresRepository,
        private uuidGen: ConcreteUUIDGenerator,
        private eventHandler: EventHandlerNative,
    ) {}

    @Put('modify')
    @ApiHeader({ name: 'auth' })
    @Membresies(UserTypes.VIP)
    @UseGuards(AuthCuard, MembersyGuard)
    async execute(@Body() data: ModifySerieDTO): Promise<CreateSerieResponse> {
        const resp = await new ModifySerieCommand(
            this.serieRepository,
            this.uuidGen,
            this.eventHandler,
        ).execute(data)
        return resp.unwrap()
    }
}
