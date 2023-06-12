import { ControllerContract } from 'src/core/infraestructure/controllers/controller-model/controller.contract'
import { GetVideogameByIdResponse } from 'src/videogame/application/queries/get-by-id/types/response'
import { VideogamePostgresRepository } from '../../repositories/videogame.postgres.repository'
import { HeroePostgresRepository } from 'src/heroe/infraestructure/repositories/heroe.postgres.repository'
import { VillainPostgresRepository } from 'src/villain/infraestructure/repositories/villain.postgres.repository'
import { CivilPostgresRepository } from 'src/civil/infraestructure/repositories/civil.postgres.repository'
import { OrganizationPostgresRepository } from 'src/organization/infraestructure/repositories/organization.postgres.repository'
import { GetVideogameByIdQuery } from 'src/videogame/application/queries/get-by-id/get.videogame.id'
import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { VIDEOGAME_ROUTE, VIDEOGAME_TAG } from '../prefix'
import { AuthCuard } from 'src/user/infraestructure/guards/auth.guard'

@Controller(VIDEOGAME_ROUTE)
@ApiTags(VIDEOGAME_TAG)
export class GetVideogameByIdController
    implements ControllerContract<string, GetVideogameByIdResponse>
{
    constructor(
        private videogameRepository: VideogamePostgresRepository,
        private heroeRepository: HeroePostgresRepository,
        private villainRepository: VillainPostgresRepository,
        private civilRepository: CivilPostgresRepository,
        private organizationRepository: OrganizationPostgresRepository,
    ) {}

    @Get('detail/:id')
    @ApiHeader({ name: 'auth' })
    @UseGuards(AuthCuard)
    async execute(@Param('id') id: string): Promise<GetVideogameByIdResponse> {
        const resp = await new GetVideogameByIdQuery(
            this.videogameRepository,
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
