import { ControllerContract } from 'src/core/infraestructure/controllers/controller-model/controller.contract'
import { CreateOrganizationResponse } from 'src/organization/application/commands/create/types/response'
import { OrganizationPostgresRepository } from '../../repositories/organization.postgres.repository'
import { ConcreteUUIDGenerator } from 'src/core/infraestructure/UUID/service/concrete.UUID.generator'
import { EventHandlerNative } from 'src/core/infraestructure/event-handler/native/service/event.hadler.native.service'
import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common'
import { ORGANIZATION_ROUTE, ORGANIZATION_TAG } from '../prefix'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { Membresies } from 'src/user/infraestructure/metadata/membresy.metadata'
import { UserTypes } from 'src/user/model/user'
import { MembersyGuard } from 'src/user/infraestructure/guards/membresy.guard'
import { AuthCuard } from 'src/user/infraestructure/guards/auth.guard'
import { ModifyOrganizationDTO } from './dto/dto'
import { ModifyOrganizationCommand } from 'src/organization/application/commands/modify/modify.organization'

@Controller(ORGANIZATION_ROUTE)
@ApiTags(ORGANIZATION_TAG)
export class ModifyOrganizationController
    implements
        ControllerContract<ModifyOrganizationDTO, CreateOrganizationResponse>
{
    constructor(
        private organizationRepository: OrganizationPostgresRepository,
        private eventHandler: EventHandlerNative,
    ) {}

    @Put('modify')
    @ApiHeader({ name: 'auth' })
    @Membresies(UserTypes.VIP)
    @UseGuards(AuthCuard, MembersyGuard)
    async execute(
        @Body() data: ModifyOrganizationDTO,
    ): Promise<CreateOrganizationResponse> {
        const resp = await new ModifyOrganizationCommand(
            this.organizationRepository,
            this.eventHandler,
        ).execute(data)
        return resp.unwrap()
    }
}
