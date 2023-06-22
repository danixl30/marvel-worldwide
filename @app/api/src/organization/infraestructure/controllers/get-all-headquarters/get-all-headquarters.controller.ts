import { ControllerContract } from 'src/core/infraestructure/controllers/controller-model/controller.contract'
import { OrganizationPostgresRepository } from '../../repositories/organization.postgres.repository'
import { Controller, Get, UseGuards } from '@nestjs/common'
import { ORGANIZATION_ROUTE, ORGANIZATION_TAG } from '../prefix'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { AuthCuard } from 'src/user/infraestructure/guards/auth.guard'
import { GetAllHeadquarters } from 'src/organization/application/queries/get-all-headquarters/types/response'
import { GetAllHeadquartersQuery } from 'src/organization/application/queries/get-all-headquarters/get.all.headquarters'

@Controller(ORGANIZATION_ROUTE)
@ApiTags(ORGANIZATION_TAG)
export class GetAllHeadquartersController
    implements ControllerContract<undefined, GetAllHeadquarters>
{
    constructor(
        private organizationRepository: OrganizationPostgresRepository,
    ) {}

    @Get('headquarter/all')
    @ApiHeader({ name: 'auth' })
    @UseGuards(AuthCuard)
    async execute(): Promise<GetAllHeadquarters> {
        const resp = await new GetAllHeadquartersQuery(
            this.organizationRepository,
        ).execute()
        return resp.unwrap()
    }
}
