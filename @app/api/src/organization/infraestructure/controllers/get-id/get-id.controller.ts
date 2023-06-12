import { ControllerContract } from 'src/core/infraestructure/controllers/controller-model/controller.contract'
import { GetOrganizationByIdResponse } from 'src/organization/application/queries/get-by-id/type/response'
import { OrganizationPostgresRepository } from '../../repositories/organization.postgres.repository'
import { HeroePostgresRepository } from 'src/heroe/infraestructure/repositories/heroe.postgres.repository'
import { VillainPostgresRepository } from 'src/villain/infraestructure/repositories/villain.postgres.repository'
import { CivilPostgresRepository } from 'src/civil/infraestructure/repositories/civil.postgres.repository'
import { GetOrganizationByIdQuery } from 'src/organization/application/queries/get-by-id/get.organization.id'
import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { ORGANIZATION_ROUTE, ORGANIZATION_TAG } from '../prefix'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { AuthCuard } from 'src/user/infraestructure/guards/auth.guard'

@Controller(ORGANIZATION_ROUTE)
@ApiTags(ORGANIZATION_TAG)
export class GetOrganizationByIdController
    implements ControllerContract<string, GetOrganizationByIdResponse>
{
    constructor(
        private organizationRepository: OrganizationPostgresRepository,
        private heroeRepository: HeroePostgresRepository,
        private villainRepository: VillainPostgresRepository,
        private civilRepository: CivilPostgresRepository,
    ) {}

    @Get('detail/:id')
    @ApiHeader({ name: 'auth' })
    @UseGuards(AuthCuard)
    async execute(@Param() id: string): Promise<GetOrganizationByIdResponse> {
        const resp = await new GetOrganizationByIdQuery(
            this.organizationRepository,
            this.heroeRepository,
            this.villainRepository,
            this.civilRepository,
        ).execute({
            id,
        })
        return resp.unwrap()
    }
}
