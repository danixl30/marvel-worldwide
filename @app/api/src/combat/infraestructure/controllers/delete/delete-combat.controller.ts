import { DeleteCombatResponse } from 'src/combat/application/commands/delete/types/response'
import { ControllerContract } from 'src/core/infraestructure/controllers/controller-model/controller.contract'
import { CombatPostgresRepository } from '../../repository/combat.postgres.repository'
import { EventHandlerNative } from 'src/core/infraestructure/event-handler/native/service/event.hadler.native.service'
import { DeleteCombatCommand } from 'src/combat/application/commands/delete/delete.combat'
import { Controller, Delete, Param, UseGuards } from '@nestjs/common'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { COMBAT_ROUTE, COMBAT_TAG } from '../prefix'
import { Membresies } from 'src/user/infraestructure/metadata/membresy.metadata'
import { UserTypes } from 'src/user/model/user'
import { MembersyGuard } from 'src/user/infraestructure/guards/membresy.guard'
import { AuthCuard } from 'src/user/infraestructure/guards/auth.guard'

@Controller(COMBAT_ROUTE)
@ApiTags(COMBAT_TAG)
export class DeleteCombatController
    implements ControllerContract<string, DeleteCombatResponse>
{
    constructor(
        private combatRepository: CombatPostgresRepository,
        private eventHandler: EventHandlerNative,
    ) {}

    @Delete(':id')
    @ApiHeader({ name: 'auth' })
    @Membresies(UserTypes.VIP)
    @UseGuards(AuthCuard, MembersyGuard)
    async execute(@Param('id') id: string): Promise<DeleteCombatResponse> {
        const resp = await new DeleteCombatCommand(
            this.combatRepository,
            this.eventHandler,
        ).execute({
            id,
        })
        return resp.unwrap()
    }
}
