import { GetByCriteria } from 'src/civil/infraestructure/controllers/get-criteria/dto/get.criteria.dto'
import { ControllerContract } from 'src/core/infraestructure/controllers/controller-model/controller.contract'
import { GetHeroesByCriteriaResponse } from 'src/heroe/application/queries/get-by-criteria/types/response'
import { HeroePostgresRepository } from '../../repositories/heroe.postgres.repository'
import { GetHeroesByCriteriaQuery } from 'src/heroe/application/queries/get-by-criteria/get.heroe.criteria'
import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { HEROE_ROUTE, HEROE_TAG } from '../prefix'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { AuthCuard } from 'src/user/infraestructure/guards/auth.guard'

@Controller(HEROE_ROUTE)
@ApiTags(HEROE_TAG)
export class GetHeroesByCriteriaController
    implements ControllerContract<GetByCriteria, GetHeroesByCriteriaResponse>
{
    constructor(private heroeRepository: HeroePostgresRepository) {}

    @Get('criteria')
    @ApiHeader({ name: 'auth' })
    @UseGuards(AuthCuard)
    async execute(
        @Query() data: GetByCriteria,
    ): Promise<GetHeroesByCriteriaResponse> {
        const resp = await new GetHeroesByCriteriaQuery(
            this.heroeRepository,
        ).execute(data)
        return resp.unwrap()
    }
}
