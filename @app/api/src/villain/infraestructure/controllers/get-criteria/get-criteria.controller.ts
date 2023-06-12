import { GetByCriteria } from 'src/civil/infraestructure/controllers/get-criteria/dto/get.criteria.dto'
import { ControllerContract } from 'src/core/infraestructure/controllers/controller-model/controller.contract'
import { GetVillainsByCriteriaResponse } from 'src/villain/application/queries/get-by-criteria/types/response'
import { VillainPostgresRepository } from '../../repositories/villain.postgres.repository'
import { GetVillainsByCriteriaQuery } from 'src/villain/application/queries/get-by-criteria/get.villain.criteria'
import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { VILLAIN_ROUTE, VILLAIN_TAG } from '../prefix'
import { AuthCuard } from 'src/user/infraestructure/guards/auth.guard'

@Controller(VILLAIN_ROUTE)
@ApiTags(VILLAIN_TAG)
export class GetVillainByCriteriaController
    implements ControllerContract<GetByCriteria, GetVillainsByCriteriaResponse>
{
    constructor(private villainRepository: VillainPostgresRepository) {}

    @Get('criteria')
    @ApiHeader({ name: 'auth' })
    @UseGuards(AuthCuard)
    async execute(
        @Query() data: GetByCriteria,
    ): Promise<GetVillainsByCriteriaResponse> {
        const resp = await new GetVillainsByCriteriaQuery(
            this.villainRepository,
        ).execute(data)
        return resp.unwrap()
    }
}
