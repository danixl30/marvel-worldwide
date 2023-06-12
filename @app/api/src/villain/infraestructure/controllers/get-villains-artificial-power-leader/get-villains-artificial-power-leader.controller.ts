import { ControllerContract } from 'src/core/infraestructure/controllers/controller-model/controller.contract'
import { GetVillainsThatHaveArtificialPowersAndLeaderResponse } from 'src/villain/application/queries/get-villains-artificial-power-leader/types/response'
import { VillainPostgresRepository } from '../../repositories/villain.postgres.repository'
import { OrganizationPostgresRepository } from 'src/organization/infraestructure/repositories/organization.postgres.repository'
import { GetVillainsThatHaveArtificialPowersAndLeaderQuery } from 'src/villain/application/queries/get-villains-artificial-power-leader/get.villains.artificial.leader'
import { Controller, Get, UseGuards } from '@nestjs/common'
import { VILLAIN_ROUTE, VILLAIN_TAG } from '../prefix'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { AuthCuard } from 'src/user/infraestructure/guards/auth.guard'

@Controller(VILLAIN_ROUTE)
@ApiTags(VILLAIN_TAG)
export class GetVillainsArtificialPowersController
    implements
        ControllerContract<
            undefined,
            GetVillainsThatHaveArtificialPowersAndLeaderResponse
        >
{
    constructor(
        private villainRepository: VillainPostgresRepository,
        private organizationRepository: OrganizationPostgresRepository,
    ) {}

    @Get('artificial/powers/leader')
    @ApiHeader({ name: 'auth' })
    @UseGuards(AuthCuard)
    async execute(): Promise<GetVillainsThatHaveArtificialPowersAndLeaderResponse> {
        const resp =
            await new GetVillainsThatHaveArtificialPowersAndLeaderQuery(
                this.villainRepository,
                this.organizationRepository,
            ).execute()
        return resp.unwrap()
    }
}
