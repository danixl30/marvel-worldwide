import { ControllerContract } from 'src/core/infraestructure/controllers/controller-model/controller.contract'
import { DeleteVillainResponse } from 'src/villain/application/commands/delete/types/response'
import { VillainPostgresRepository } from '../../repositories/villain.postgres.repository'
import { EventHandlerNative } from 'src/core/infraestructure/event-handler/native/service/event.hadler.native.service'
import { DeleteVillainCommand } from 'src/villain/application/commands/delete/delete.villain'
import { Controller, Delete, Param, UseGuards } from '@nestjs/common'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { VILLAIN_ROUTE, VILLAIN_TAG } from '../prefix'
import { Membresies } from 'src/user/infraestructure/metadata/membresy.metadata'
import { UserTypes } from 'src/user/model/user'
import { MembersyGuard } from 'src/user/infraestructure/guards/membresy.guard'
import { AuthCuard } from 'src/user/infraestructure/guards/auth.guard'

@Controller(VILLAIN_ROUTE)
@ApiTags(VILLAIN_TAG)
export class DeleteVillainController
    implements ControllerContract<string, DeleteVillainResponse>
{
    constructor(
        private villainRepository: VillainPostgresRepository,
        private eventHandler: EventHandlerNative,
    ) {}

    @Delete(':id')
    @ApiHeader({ name: 'auth' })
    @Membresies(UserTypes.VIP)
    @UseGuards(AuthCuard, MembersyGuard)
    async execute(@Param('id') id: string): Promise<DeleteVillainResponse> {
        const resp = await new DeleteVillainCommand(
            this.villainRepository,
            this.eventHandler,
        ).execute({
            id,
        })
        return resp.unwrap()
    }
}
