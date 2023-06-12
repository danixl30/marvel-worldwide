import { ControllerContract } from 'src/core/infraestructure/controllers/controller-model/controller.contract'
import { DeleteOrganizationResponse } from 'src/organization/application/commands/delete/types/response'
import { OrganizationPostgresRepository } from '../../repositories/organization.postgres.repository'
import { EventHandlerNative } from 'src/core/infraestructure/event-handler/native/service/event.hadler.native.service'
import { DeleteOrganizationCommand } from 'src/organization/application/commands/delete/delete.organization'
import { Controller, Delete, Param, UseGuards } from '@nestjs/common'
import { ORGANIZATION_ROUTE, ORGANIZATION_TAG } from '../prefix'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { Membresies } from 'src/user/infraestructure/metadata/membresy.metadata'
import { UserTypes } from 'src/user/model/user'
import { MembersyGuard } from 'src/user/infraestructure/guards/membresy.guard'
import { AuthCuard } from 'src/user/infraestructure/guards/auth.guard'

@Controller(ORGANIZATION_ROUTE)
@ApiTags(ORGANIZATION_TAG)
export class DeleteOrganizationController
    implements ControllerContract<string, DeleteOrganizationResponse>
{
    constructor(
        private organizationRepository: OrganizationPostgresRepository,
        private eventHandler: EventHandlerNative,
    ) {}

    @Delete(':id')
    @ApiHeader({ name: 'auth' })
    @Membresies(UserTypes.VIP)
    @UseGuards(AuthCuard, MembersyGuard)
    async execute(
        @Param('id') id: string,
    ): Promise<DeleteOrganizationResponse> {
        const resp = await new DeleteOrganizationCommand(
            this.organizationRepository,
            this.eventHandler,
        ).execute({
            id,
        })
        return resp.unwrap()
    }
}
