import { ControllerContract } from 'src/core/infraestructure/controllers/controller-model/controller.contract'
import { DeleteVideogameResponse } from 'src/videogame/application/commands/delete/types/response'
import { VideogamePostgresRepository } from '../../repositories/videogame.postgres.repository'
import { EventHandlerNative } from 'src/core/infraestructure/event-handler/native/service/event.hadler.native.service'
import { DeleteVideogameCommand } from 'src/videogame/application/commands/delete/delete.videogame'
import { Controller, Delete, Param, UseGuards } from '@nestjs/common'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { VIDEOGAME_ROUTE, VIDEOGAME_TAG } from '../prefix'
import { Membresies } from 'src/user/infraestructure/metadata/membresy.metadata'
import { UserTypes } from 'src/user/model/user'
import { MembersyGuard } from 'src/user/infraestructure/guards/membresy.guard'
import { AuthCuard } from 'src/user/infraestructure/guards/auth.guard'

@Controller(VIDEOGAME_ROUTE)
@ApiTags(VIDEOGAME_TAG)
export class DeleteVideogameController
    implements ControllerContract<string, DeleteVideogameResponse>
{
    constructor(
        private videogameRepository: VideogamePostgresRepository,
        private eventHandler: EventHandlerNative,
    ) {}

    @Delete(':id')
    @ApiHeader({ name: 'auth' })
    @Membresies(UserTypes.VIP)
    @UseGuards(AuthCuard, MembersyGuard)
    async execute(@Param('id') id: string): Promise<DeleteVideogameResponse> {
        const resp = await new DeleteVideogameCommand(
            this.videogameRepository,
            this.eventHandler,
        ).execute({
            id,
        })
        return resp.unwrap()
    }
}
