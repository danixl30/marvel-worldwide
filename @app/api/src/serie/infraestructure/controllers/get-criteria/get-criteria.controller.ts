import { GetByCriteria } from 'src/civil/infraestructure/controllers/get-criteria/dto/get.criteria.dto'
import { ControllerContract } from 'src/core/infraestructure/controllers/controller-model/controller.contract'
import { GetSeriesByCriteriaResponse } from 'src/serie/application/queries/get-by-criteria/types/response'
import { SeriePostgresRepository } from '../../repositories/serie.postgres.repository'
import { GetSeriesByCriteriaQuery } from 'src/serie/application/queries/get-by-criteria/get.serie.criteria'
import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { SERIE_ROUTE, SERIE_TAG } from '../prefix'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { AuthCuard } from 'src/user/infraestructure/guards/auth.guard'

@Controller(SERIE_ROUTE)
@ApiTags(SERIE_TAG)
export class GetSerieByCriteria
    implements ControllerContract<GetByCriteria, GetSeriesByCriteriaResponse>
{
    constructor(private serieRepository: SeriePostgresRepository) {}

    @Get('criteria')
    @ApiHeader({ name: 'auth' })
    @UseGuards(AuthCuard)
    async execute(
        @Query() data: GetByCriteria,
    ): Promise<GetSeriesByCriteriaResponse> {
        const resp = await new GetSeriesByCriteriaQuery(
            this.serieRepository,
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
