import { GetByCriteria } from 'src/civil/infraestructure/controllers/get-criteria/dto/get.criteria.dto'
import { GetComabtsByCriteriaResponse } from 'src/combat/application/queries/get-by-criteria/types/response'
import { ControllerContract } from 'src/core/infraestructure/controllers/controller-model/controller.contract'
import { CombatPostgresRepository } from '../../repository/combat.postgres.repository'
import { GetComabtsByCriteriaQuery } from 'src/combat/application/queries/get-by-criteria/get.combats.criteria'
import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { COMBAT_ROUTE, COMBAT_TAG } from '../prefix'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { AuthCuard } from 'src/user/infraestructure/guards/auth.guard'

@Controller(COMBAT_ROUTE)
@ApiTags(COMBAT_TAG)
export class GetCombatsByCriteriaController
    implements ControllerContract<GetByCriteria, GetComabtsByCriteriaResponse>
{
    constructor(private combatRepository: CombatPostgresRepository) {}

    @Get('criteria')
    @ApiHeader({ name: 'auth' })
    @UseGuards(AuthCuard)
    async execute(
        @Query() data: GetByCriteria,
    ): Promise<GetComabtsByCriteriaResponse> {
        const resp = await new GetComabtsByCriteriaQuery(
            this.combatRepository,
        ).execute({
            term: data.term,
            pagination: {
                page: data.page || 1,
                limit: data.limit || 10,
            },
        })
        return resp.unwrap()
    }
}
