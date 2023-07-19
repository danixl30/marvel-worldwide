import { ControllerContract } from 'src/core/infraestructure/controllers/controller-model/controller.contract'
import { Profile } from 'src/profile/domain/profile'
import { SeriePostgresRepository } from '../../repositories/serie.postgres.repository'
import { GetSeriesByCriteriaResponse } from 'src/serie/application/queries/get-by-criteria/types/response'
import { Controller, Get, UseGuards } from '@nestjs/common'
import { SERIE_ROUTE, SERIE_TAG } from '../prefix'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { AuthCuard } from 'src/user/infraestructure/guards/auth.guard'
import { ProfileGuard } from 'src/profile/infraestructure/guards/profile.guard'
import { GetProfile } from 'src/profile/infraestructure/decorators/get.profile'
import { GetSeriesTop10HistoryResponse } from 'src/serie/application/queries/get-top-10-history/types/response'
import { GetSeriesTop10HistoryQuery } from 'src/serie/application/queries/get-top-10-history/get.top.10.history'

@Controller(SERIE_ROUTE)
@ApiTags(SERIE_TAG)
export class GetSeriesTop10History
    implements ControllerContract<Profile, GetSeriesTop10HistoryResponse>
{
    constructor(private serieRepository: SeriePostgresRepository) {}

    @Get('top/10/history')
    @ApiHeader({ name: 'auth' })
    @UseGuards(AuthCuard, ProfileGuard)
    async execute(
        @GetProfile() profile: Profile,
    ): Promise<GetSeriesByCriteriaResponse> {
        const resp = await new GetSeriesTop10HistoryQuery(
            this.serieRepository,
        ).execute({
            profileId: profile.id.value,
        })

        return resp.unwrap()
    }
}
