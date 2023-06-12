import { ControllerContract } from 'src/core/infraestructure/controllers/controller-model/controller.contract'
import { GetHeroesThatHaveArtificialPowersAndLeaderResponse } from 'src/heroe/application/queries/get-heroes-artificial-power-leader/types/response'
import { HeroePostgresRepository } from '../../repositories/heroe.postgres.repository'
import { GetHeroesThatHaveArtificialPowersAndLeaderQuery } from 'src/heroe/application/queries/get-heroes-artificial-power-leader/get.heroes.artificial.leader'
import { OrganizationPostgresRepository } from 'src/organization/infraestructure/repositories/organization.postgres.repository'
import { Controller, Get, UseGuards } from '@nestjs/common'
import { HEROE_ROUTE, HEROE_TAG } from '../prefix'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { AuthCuard } from 'src/user/infraestructure/guards/auth.guard'

@Controller(HEROE_ROUTE)
@ApiTags(HEROE_TAG)
export class GetHeroesArtificialLeaderController
    implements
        ControllerContract<
            undefined,
            GetHeroesThatHaveArtificialPowersAndLeaderResponse
        >
{
    constructor(
        private heroeRepository: HeroePostgresRepository,
        private organizationRepository: OrganizationPostgresRepository,
    ) {}

    @Get('artificial/powers/leader')
    @ApiHeader({ name: 'auth' })
    @UseGuards(AuthCuard)
    async execute(): Promise<GetHeroesThatHaveArtificialPowersAndLeaderResponse> {
        const resp = await new GetHeroesThatHaveArtificialPowersAndLeaderQuery(
            this.heroeRepository,
            this.organizationRepository,
        ).execute()
        return resp.unwrap()
    }
}
