import { ControllerContract } from 'src/core/infraestructure/controllers/controller-model/controller.contract'
import { OrganizationPostgresRepository } from '../../repositories/organization.postgres.repository'
import { Controller, Get, UseGuards } from '@nestjs/common'
import { ORGANIZATION_ROUTE, ORGANIZATION_TAG } from '../prefix'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { AuthCuard } from 'src/user/infraestructure/guards/auth.guard'
import { GetAllOrgs } from 'src/organization/application/queries/get-all/types/response'
import { GetAllOrganizationsQuery } from 'src/organization/application/queries/get-all/get.all.org'

@Controller(ORGANIZATION_ROUTE)
@ApiTags(ORGANIZATION_TAG)
export class GetAllOrganizationsController
    implements ControllerContract<undefined, GetAllOrgs>
{
    constructor(
        private organizationRepository: OrganizationPostgresRepository,
    ) {}

    @Get('all')
    @ApiHeader({ name: 'auth' })
    @UseGuards(AuthCuard)
    async execute(): Promise<GetAllOrgs> {
        const resp = await new GetAllOrganizationsQuery(
            this.organizationRepository,
        ).execute()
        return resp.unwrap()
    }
}
