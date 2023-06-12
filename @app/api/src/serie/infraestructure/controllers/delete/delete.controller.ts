import { ControllerContract } from 'src/core/infraestructure/controllers/controller-model/controller.contract'
import { DeleteSerieResponse } from 'src/serie/application/commands/delete/types/response'
import { SeriePostgresRepository } from '../../repositories/serie.postgres.repository'
import { EventHandlerNative } from 'src/core/infraestructure/event-handler/native/service/event.hadler.native.service'
import { DeleteSerieCommand } from 'src/serie/application/commands/delete/delete.serie'
import { Controller, Delete, Param, UseGuards } from '@nestjs/common'
import { SERIE_ROUTE, SERIE_TAG } from '../prefix'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { Membresies } from 'src/user/infraestructure/metadata/membresy.metadata'
import { UserTypes } from 'src/user/model/user'
import { MembersyGuard } from 'src/user/infraestructure/guards/membresy.guard'
import { AuthCuard } from 'src/user/infraestructure/guards/auth.guard'

@Controller(SERIE_ROUTE)
@ApiTags(SERIE_TAG)
export class DeletSerieController
    implements ControllerContract<string, DeleteSerieResponse>
{
    constructor(
        private serieRepository: SeriePostgresRepository,
        private eventHandler: EventHandlerNative,
    ) {}

    @Delete(':id')
    @ApiHeader({ name: 'auth' })
    @Membresies(UserTypes.VIP)
    @UseGuards(AuthCuard, MembersyGuard)
    async execute(@Param('id') id: string): Promise<DeleteSerieResponse> {
        const resp = await new DeleteSerieCommand(
            this.serieRepository,
            this.eventHandler,
        ).execute({
            id,
        })
        return resp.unwrap()
    }
}
