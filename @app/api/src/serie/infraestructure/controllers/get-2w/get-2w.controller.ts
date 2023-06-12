import { ControllerContract } from 'src/core/infraestructure/controllers/controller-model/controller.contract'
import { GetSeries2WResponse } from 'src/serie/application/queries/get-2w/types/response'
import { SeriePostgresRepository } from '../../repositories/serie.postgres.repository'
import { GetSeriesByCriteriaResponse } from 'src/serie/application/queries/get-by-criteria/types/response'
import { GetSeries2WQuery } from 'src/serie/application/queries/get-2w/get.2W.series'
import { Controller, Get, UseGuards } from '@nestjs/common'
import { SERIE_ROUTE, SERIE_TAG } from '../prefix'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { AuthCuard } from 'src/user/infraestructure/guards/auth.guard'

@Controller(SERIE_ROUTE)
@ApiTags(SERIE_TAG)
export class GetSerie2WNear
    implements ControllerContract<undefined, GetSeries2WResponse>
{
    constructor(private serieRepository: SeriePostgresRepository) {}

    @Get('2w')
    @ApiHeader({ name: 'auth' })
    @UseGuards(AuthCuard)
    async execute(): Promise<GetSeriesByCriteriaResponse> {
        const resp = await new GetSeries2WQuery(this.serieRepository).execute()
        return resp.unwrap()
    }
}
