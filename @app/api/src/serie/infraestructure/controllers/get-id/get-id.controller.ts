import { ControllerContract } from 'src/core/infraestructure/controllers/controller-model/controller.contract'
import { GetSerieByIdResponse } from 'src/serie/application/queries/get-by-id/types/response'
import { SeriePostgresRepository } from '../../repositories/serie.postgres.repository'
import { HeroePostgresRepository } from 'src/heroe/infraestructure/repositories/heroe.postgres.repository'
import { VillainPostgresRepository } from 'src/villain/infraestructure/repositories/villain.postgres.repository'
import { CivilPostgresRepository } from 'src/civil/infraestructure/repositories/civil.postgres.repository'
import { OrganizationPostgresRepository } from 'src/organization/infraestructure/repositories/organization.postgres.repository'
import { GetSerieByIdQuery } from 'src/serie/application/queries/get-by-id/get.serie.id'
import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { SERIE_ROUTE, SERIE_TAG } from '../prefix'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { AuthCuard } from 'src/user/infraestructure/guards/auth.guard'

@Controller(SERIE_ROUTE)
@ApiTags(SERIE_TAG)
export class GetSerieByIdController
    implements ControllerContract<string, GetSerieByIdResponse>
{
    constructor(
        private serieRepository: SeriePostgresRepository,
        private heroeRepository: HeroePostgresRepository,
        private villainRepository: VillainPostgresRepository,
        private civilRepository: CivilPostgresRepository,
        private organizationRepository: OrganizationPostgresRepository,
    ) {}

    @Get('detial/:id')
    @ApiHeader({ name: 'auth' })
    @UseGuards(AuthCuard)
    async execute(@Param('id') id: string): Promise<GetSerieByIdResponse> {
        const resp = await new GetSerieByIdQuery(
            this.serieRepository,
            this.heroeRepository,
            this.villainRepository,
            this.civilRepository,
            this.organizationRepository,
        ).execute({
            id,
        })
        return resp.unwrap()
    }
}
