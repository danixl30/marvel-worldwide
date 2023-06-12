import { GetByCriteria } from 'src/civil/infraestructure/controllers/get-criteria/dto/get.criteria.dto'
import { ControllerContract } from 'src/core/infraestructure/controllers/controller-model/controller.contract'
import { OrganizationPostgresRepository } from '../../repositories/organization.postgres.repository'
import { GetOrganizationsByCriteriaQuery } from 'src/organization/application/queries/get-by-criteria/get.organization.criteria'
import { GetOrganizationsByCriteriaResponse } from 'src/organization/application/queries/get-by-criteria/types/response'
import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { ORGANIZATION_ROUTE, ORGANIZATION_TAG } from '../prefix'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { AuthCuard } from 'src/user/infraestructure/guards/auth.guard'

@Controller(ORGANIZATION_ROUTE)
@ApiTags(ORGANIZATION_TAG)
export class GetOrganizationsByCriteriaController
    implements
        ControllerContract<GetByCriteria, GetOrganizationsByCriteriaResponse>
{
    constructor(
        private organizationRepository: OrganizationPostgresRepository,
    ) {}

    @Get('criteria')
    @ApiHeader({ name: 'auth' })
    @UseGuards(AuthCuard)
    async execute(
        @Query() data: GetByCriteria,
    ): Promise<GetOrganizationsByCriteriaResponse> {
        const resp = await new GetOrganizationsByCriteriaQuery(
            this.organizationRepository,
        ).execute(data)
        return resp.unwrap()
    }
}
