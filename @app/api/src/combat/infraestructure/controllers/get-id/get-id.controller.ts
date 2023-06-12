import { GetCombatByIdResponse } from 'src/combat/application/queries/get-by-id/types/response'
import { ControllerContract } from 'src/core/infraestructure/controllers/controller-model/controller.contract'
import { CombatPostgresRepository } from '../../repository/combat.postgres.repository'
import { GetCombatByIdQuery } from 'src/combat/application/queries/get-by-id/get.combat.id'
import { HeroePostgresRepository } from 'src/heroe/infraestructure/repositories/heroe.postgres.repository'
import { VillainPostgresRepository } from 'src/villain/infraestructure/repositories/villain.postgres.repository'
import { CivilPostgresRepository } from 'src/civil/infraestructure/repositories/civil.postgres.repository'
import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { COMBAT_ROUTE, COMBAT_TAG } from '../prefix'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { AuthCuard } from 'src/user/infraestructure/guards/auth.guard'

@Controller(COMBAT_ROUTE)
@ApiTags(COMBAT_TAG)
export class GetCombatByIdController
    implements ControllerContract<string, GetCombatByIdResponse>
{
    constructor(
        private combatRepository: CombatPostgresRepository,
        private heroeRepository: HeroePostgresRepository,
        private villainRepository: VillainPostgresRepository,
        private civilRepository: CivilPostgresRepository,
    ) {}

    @Get('detail/:id')
    @ApiHeader({ name: 'auth' })
    @UseGuards(AuthCuard)
    async execute(@Param('id') id: string): Promise<GetCombatByIdResponse> {
        const data = await new GetCombatByIdQuery(
            this.combatRepository,
            this.heroeRepository,
            this.villainRepository,
            this.civilRepository,
        ).execute({
            id,
        })
        return data.unwrap()
    }
}
