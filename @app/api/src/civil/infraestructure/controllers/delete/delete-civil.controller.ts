import { DeleteCivilResponse } from 'src/civil/application/commands/delete-civil/types/response'
import { ControllerContract } from 'src/core/infraestructure/controllers/controller-model/controller.contract'
import { CivilPostgresRepository } from '../../repositories/civil.postgres.repository'
import { EventHandlerNative } from 'src/core/infraestructure/event-handler/native/service/event.hadler.native.service'
import { DeleteCivilCommand } from 'src/civil/application/commands/delete-civil/delete.civil'
import { Controller, Delete, Param, UseGuards } from '@nestjs/common'
import { CIVIL_ROUTE, CIVIL_TAG } from '../prefix'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { AuthCuard } from 'src/user/infraestructure/guards/auth.guard'
import { MembersyGuard } from 'src/user/infraestructure/guards/membresy.guard'
import { Membresies } from 'src/user/infraestructure/metadata/membresy.metadata'
import { UserTypes } from 'src/user/model/user'

@Controller(CIVIL_ROUTE)
@ApiTags(CIVIL_TAG)
export class DeleteCivilController
    implements ControllerContract<string, DeleteCivilResponse>
{
    constructor(
        private civilRepository: CivilPostgresRepository,
        private eventHandler: EventHandlerNative,
    ) {}

    @Delete(':id')
    @ApiHeader({ name: 'auth' })
    @Membresies(UserTypes.VIP)
    @UseGuards(AuthCuard, MembersyGuard)
    async execute(@Param('id') id: string): Promise<DeleteCivilResponse> {
        const resp = await new DeleteCivilCommand(
            this.civilRepository,
            this.eventHandler,
        ).execute({
            id,
        })
        return resp.unwrap()
    }
}
