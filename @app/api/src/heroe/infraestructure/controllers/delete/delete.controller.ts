import { DeleteCombatResponse } from 'src/combat/application/commands/delete/types/response'
import { ControllerContract } from 'src/core/infraestructure/controllers/controller-model/controller.contract'
import { HeroePostgresRepository } from '../../repositories/heroe.postgres.repository'
import { EventHandlerNative } from 'src/core/infraestructure/event-handler/native/service/event.hadler.native.service'
import { DeleteCombatDTO } from 'src/combat/application/commands/delete/types/dto'
import { DeleteHeroeCommand } from 'src/heroe/application/commands/delete/delete.heroe'
import { Controller, Delete, Param, UseGuards } from '@nestjs/common'
import { HEROE_ROUTE, HEROE_TAG } from '../prefix'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { Membresies } from 'src/user/infraestructure/metadata/membresy.metadata'
import { UserTypes } from 'src/user/model/user'
import { MembersyGuard } from 'src/user/infraestructure/guards/membresy.guard'
import { AuthCuard } from 'src/user/infraestructure/guards/auth.guard'

@Controller(HEROE_ROUTE)
@ApiTags(HEROE_TAG)
export class DeleteHeroeController
    implements ControllerContract<string, DeleteCombatResponse>
{
    constructor(
        private heroeRepository: HeroePostgresRepository,
        private eventHandler: EventHandlerNative,
    ) {}

    @Delete(':id')
    @ApiHeader({ name: 'auth' })
    @Membresies(UserTypes.VIP)
    @UseGuards(AuthCuard, MembersyGuard)
    async execute(@Param('id') id: string): Promise<DeleteCombatDTO> {
        const resp = await new DeleteHeroeCommand(
            this.heroeRepository,
            this.eventHandler,
        ).execute({
            id,
        })
        return resp.unwrap()
    }
}
