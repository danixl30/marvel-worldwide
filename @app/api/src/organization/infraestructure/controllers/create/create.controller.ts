import { ControllerContract } from 'src/core/infraestructure/controllers/controller-model/controller.contract'
import { CreateOrganizationDTO } from './dto/create.dto'
import { CreateOrganizationResponse } from 'src/organization/application/commands/create/types/response'
import { OrganizationPostgresRepository } from '../../repositories/organization.postgres.repository'
import { ConcreteUUIDGenerator } from 'src/core/infraestructure/UUID/service/concrete.UUID.generator'
import { EventHandlerNative } from 'src/core/infraestructure/event-handler/native/service/event.hadler.native.service'
import { CreateOrganizationCommand } from 'src/organization/application/commands/create/create.organization'
import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { ORGANIZATION_ROUTE, ORGANIZATION_TAG } from '../prefix'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { Membresies } from 'src/user/infraestructure/metadata/membresy.metadata'
import { UserTypes } from 'src/user/model/user'
import { MembersyGuard } from 'src/user/infraestructure/guards/membresy.guard'
import { AuthCuard } from 'src/user/infraestructure/guards/auth.guard'

@Controller(ORGANIZATION_ROUTE)
@ApiTags(ORGANIZATION_TAG)
export class CreateOrganizationController
    implements
        ControllerContract<CreateOrganizationDTO, CreateOrganizationResponse>
{
    constructor(
        private organizationRepository: OrganizationPostgresRepository,
        private uuidGen: ConcreteUUIDGenerator,
        private eventHandler: EventHandlerNative,
    ) {}

    @Post('create')
    @ApiHeader({ name: 'auth' })
    @Membresies(UserTypes.VIP)
    @UseGuards(AuthCuard, MembersyGuard)
    async execute(
        @Body() data: CreateOrganizationDTO,
    ): Promise<CreateOrganizationResponse> {
        const resp = await new CreateOrganizationCommand(
            this.organizationRepository,
            this.uuidGen,
            this.eventHandler,
        ).execute(data)
        return resp.unwrap()
    }
}
