import { ControllerContract } from 'src/core/infraestructure/controllers/controller-model/controller.contract'
import { GetSeriesThatHasMoreEpisodesThanAverageDTO } from 'src/serie/application/queries/series-with-episodes-greater-than-average/types/response'
import { SeriePostgresRepository } from '../../repositories/serie.postgres.repository'
import { GetSeriesByCriteriaResponse } from 'src/serie/application/queries/get-by-criteria/types/response'
import { GetSeriesThatHasMoreEpisodesThanAverageQuery } from 'src/serie/application/queries/series-with-episodes-greater-than-average/get.series.episodes.average'
import { Controller, Get, UseGuards } from '@nestjs/common'
import { SERIE_ROUTE, SERIE_TAG } from '../prefix'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { AuthCuard } from 'src/user/infraestructure/guards/auth.guard'

@Controller(SERIE_ROUTE)
@ApiTags(SERIE_TAG)
export class GetSeriesWithMoreEpisodesThanAverageController
    implements
        ControllerContract<
            undefined,
            GetSeriesThatHasMoreEpisodesThanAverageDTO
        >
{
    constructor(private serieRepository: SeriePostgresRepository) {}

    @Get('episodes/greater/average')
    @ApiHeader({ name: 'auth' })
    @UseGuards(AuthCuard)
    async execute(): Promise<GetSeriesByCriteriaResponse> {
        const resp = await new GetSeriesThatHasMoreEpisodesThanAverageQuery(
            this.serieRepository,
        ).execute()
        return resp.unwrap()
    }
}
