import { ControllerContract } from 'src/core/infraestructure/controllers/controller-model/controller.contract'
import { Profile } from 'src/profile/domain/profile'
import { GetSeriesTrendigResponse } from 'src/serie/application/queries/get-trending/types/response'
import { SeriePostgresRepository } from '../../repositories/serie.postgres.repository'
import { GetSeriesByCriteriaResponse } from 'src/serie/application/queries/get-by-criteria/types/response'
import { GetSeriesTrendigQuery } from 'src/serie/application/queries/get-trending/get.trending'
import { Controller, Get, UseGuards } from '@nestjs/common'
import { SERIE_ROUTE, SERIE_TAG } from '../prefix'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { AuthCuard } from 'src/user/infraestructure/guards/auth.guard'
import { ProfileGuard } from 'src/profile/infraestructure/guards/profile.guard'
import { GetProfile } from 'src/profile/infraestructure/decorators/get.profile'

@Controller(SERIE_ROUTE)
@ApiTags(SERIE_TAG)
export class GetSeriesTrendingConthroller
    implements ControllerContract<Profile, GetSeriesTrendigResponse>
{
    constructor(private serieRepository: SeriePostgresRepository) {}

    @Get('trending')
    @ApiHeader({ name: 'auth' })
    @UseGuards(AuthCuard, ProfileGuard)
    async execute(
        @GetProfile() profile: Profile,
    ): Promise<GetSeriesByCriteriaResponse> {
        const resp = await new GetSeriesTrendigQuery(
            this.serieRepository,
        ).execute({
            profileId: profile.id.value,
        })

        return resp.unwrap()
    }
}
