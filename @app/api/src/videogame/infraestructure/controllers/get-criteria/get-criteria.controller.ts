import { GetByCriteria } from 'src/civil/infraestructure/controllers/get-criteria/dto/get.criteria.dto'
import { ControllerContract } from 'src/core/infraestructure/controllers/controller-model/controller.contract'
import { GetVideogamesByCriterioResponse } from 'src/videogame/application/queries/get-by-criteria/types/response'
import { VideogamePostgresRepository } from '../../repositories/videogame.postgres.repository'
import { GetVideogamesByCriterioQuery } from 'src/videogame/application/queries/get-by-criteria/get.videogame.criteria'
import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { VIDEOGAME_ROUTE, VIDEOGAME_TAG } from '../prefix'
import { AuthCuard } from 'src/user/infraestructure/guards/auth.guard'

@Controller(VIDEOGAME_ROUTE)
@ApiTags(VIDEOGAME_TAG)
export class GetVideogamesByCriteriaController
    implements
        ControllerContract<GetByCriteria, GetVideogamesByCriterioResponse>
{
    constructor(private videogameRepository: VideogamePostgresRepository) {}

    @Get('criteria')
    @ApiHeader({ name: 'auth' })
    @UseGuards(AuthCuard)
    async execute(
        @Query() data: GetByCriteria,
    ): Promise<GetVideogamesByCriterioResponse> {
        const resp = await new GetVideogamesByCriterioQuery(
            this.videogameRepository,
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
