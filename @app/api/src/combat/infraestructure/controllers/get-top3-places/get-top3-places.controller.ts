import { GetTop3CombatPlacesQuery } from 'src/combat/application/queries/top-3-places/get.top.places'
import { ControllerContract } from 'src/core/infraestructure/controllers/controller-model/controller.contract'
import { CombatPostgresRepository } from '../../repository/combat.postgres.repository'
import { Controller, Get, UseGuards } from '@nestjs/common'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { COMBAT_ROUTE, COMBAT_TAG } from '../prefix'
import { AuthCuard } from 'src/user/infraestructure/guards/auth.guard'

@Controller(COMBAT_ROUTE)
@ApiTags(COMBAT_TAG)
export class GetCombatTop3Places
    implements ControllerContract<undefined, string[]>
{
    constructor(private combatRepository: CombatPostgresRepository) {}

    @Get('top3/places')
    @ApiHeader({ name: 'auth' })
    @UseGuards(AuthCuard)
    async execute(): Promise<string[]> {
        const reps = await new GetTop3CombatPlacesQuery(
            this.combatRepository,
        ).execute()
        return reps.unwrap()
    }
}
