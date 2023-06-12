import { ControllerContract } from 'src/core/infraestructure/controllers/controller-model/controller.contract'
import { VillainPostgresRepository } from '../../repositories/villain.postgres.repository'
import { GetSuperInheritedPowersQuery } from 'src/villain/application/queries/get-super-inherited-powers/get.powers.super.inherited'
import { GetSuperInheritedPowersResponse } from 'src/villain/application/queries/get-super-inherited-powers/types/response'
import { Controller, Get, UseGuards } from '@nestjs/common'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { VILLAIN_ROUTE, VILLAIN_TAG } from '../prefix'
import { AuthCuard } from 'src/user/infraestructure/guards/auth.guard'

@Controller(VILLAIN_ROUTE)
@ApiTags(VILLAIN_TAG)
export class GetSuperArtificialPowers
    implements ControllerContract<undefined, GetSuperInheritedPowersResponse>
{
    constructor(private villainRepository: VillainPostgresRepository) {}

    @Get('super/artificial/powers')
    @ApiHeader({ name: 'auth' })
    @UseGuards(AuthCuard)
    async execute(): Promise<GetSuperInheritedPowersResponse> {
        const resp = await new GetSuperInheritedPowersQuery(
            this.villainRepository,
        ).execute()
        return resp.unwrap()
    }
}
