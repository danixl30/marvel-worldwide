import { ControllerContract } from 'src/core/infraestructure/controllers/controller-model/controller.contract'
import { Profile } from 'src/profile/domain/profile'
import { VideogamePostgresRepository } from '../../repositories/videogame.postgres.repository'
import { GetVideogamesByCriterioResponse } from 'src/videogame/application/queries/get-by-criteria/types/response'
import { Controller, Get, UseGuards } from '@nestjs/common'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { VIDEOGAME_ROUTE, VIDEOGAME_TAG } from '../prefix'
import { AuthCuard } from 'src/user/infraestructure/guards/auth.guard'
import { ProfileGuard } from 'src/profile/infraestructure/guards/profile.guard'
import { GetProfile } from 'src/profile/infraestructure/decorators/get.profile'
import { GetTop10HistoryResponse } from 'src/videogame/application/queries/top-10-history/types/response'
import { GetVideogamesTop10HistoryQuery } from 'src/videogame/application/queries/top-10-history/get.top.10.history'

@Controller(VIDEOGAME_ROUTE)
@ApiTags(VIDEOGAME_TAG)
export class GetVideogamesTop10History
    implements ControllerContract<Profile, GetTop10HistoryResponse>
{
    constructor(private videogameRepository: VideogamePostgresRepository) {}

    @Get('top/10/history')
    @ApiHeader({ name: 'auth' })
    @ApiHeader({ name: 'profile' })
    @UseGuards(AuthCuard, ProfileGuard)
    async execute(
        @GetProfile() profile: Profile,
    ): Promise<GetVideogamesByCriterioResponse> {
        const resp = await new GetVideogamesTop10HistoryQuery(
            this.videogameRepository,
        ).execute({
            profileId: profile.id.value,
        })
        return resp.unwrap()
    }
}
