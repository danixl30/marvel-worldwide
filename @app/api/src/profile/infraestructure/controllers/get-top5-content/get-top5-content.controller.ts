import { ControllerContract } from 'src/core/infraestructure/controllers/controller-model/controller.contract'
import { GetTop5ContentPremiumVIPQuery } from 'src/profile/application/queries/top-5-content/get.top.content'
import { ProfilePostgresRepository } from '../../repositories/profile.postgres.repository'
import { SeriePostgresRepository } from 'src/serie/infraestructure/repositories/serie.postgres.repository'
import { VideogamePostgresRepository } from 'src/videogame/infraestructure/repositories/videogame.postgres.repository'
import { MoviePostgresRepository } from 'src/movie/infraestructure/repositories/movie.postgres.repository'
import { GetTop5ContentPremiumVIPResponse } from 'src/profile/application/queries/top-5-content/types/response'
import { Controller, Get, UseGuards } from '@nestjs/common'
import { PROFILE_ROUTE, PROFILE_TAG } from '../prefix'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { AuthCuard } from 'src/user/infraestructure/guards/auth.guard'

@Controller(PROFILE_ROUTE)
@ApiTags(PROFILE_TAG)
export class GetTop5ContentController
    implements ControllerContract<undefined, GetTop5ContentPremiumVIPResponse>
{
    constructor(
        private profileRepository: ProfilePostgresRepository,
        private movieRepository: MoviePostgresRepository,
        private serieRepository: SeriePostgresRepository,
        private videogameRepository: VideogamePostgresRepository,
    ) {}

    @Get('top5/content')
    @ApiHeader({ name: 'auth' })
    @ApiHeader({ name: 'profile' })
    @UseGuards(AuthCuard)
    async execute(): Promise<GetTop5ContentPremiumVIPResponse> {
        const resp = await new GetTop5ContentPremiumVIPQuery(
            this.profileRepository,
            this.movieRepository,
            this.serieRepository,
            this.videogameRepository,
        ).execute()
        return resp.unwrap()
    }
}
