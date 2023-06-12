import { ControllerContract } from 'src/core/infraestructure/controllers/controller-model/controller.contract'
import { Profile } from 'src/profile/domain/profile'
import { GetVideogamesTrendingResponse } from 'src/videogame/application/queries/get-trending/types/response'
import { VideogamePostgresRepository } from '../../repositories/videogame.postgres.repository'
import { GetVideogamesByCriterioResponse } from 'src/videogame/application/queries/get-by-criteria/types/response'
import { GetVideogamesTrendingQuery } from 'src/videogame/application/queries/get-trending/get.trending'
import { Controller, Get, UseGuards } from '@nestjs/common'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { VIDEOGAME_ROUTE, VIDEOGAME_TAG } from '../prefix'
import { AuthCuard } from 'src/user/infraestructure/guards/auth.guard'
import { ProfileGuard } from 'src/profile/infraestructure/guards/profile.guard'
import { GetProfile } from 'src/profile/infraestructure/decorators/get.profile'

@Controller(VIDEOGAME_ROUTE)
@ApiTags(VIDEOGAME_TAG)
export class GetVideogamesTrendincController
    implements ControllerContract<Profile, GetVideogamesTrendingResponse>
{
    constructor(private videogameRepository: VideogamePostgresRepository) {}

    @Get('trending')
    @ApiHeader({ name: 'auth' })
    @ApiHeader({ name: 'profile' })
    @UseGuards(AuthCuard, ProfileGuard)
    async execute(
        @GetProfile() profile: Profile,
    ): Promise<GetVideogamesByCriterioResponse> {
        const resp = await new GetVideogamesTrendingQuery(
            this.videogameRepository,
        ).execute({
            profileId: profile.id.value,
        })
        return resp.unwrap()
    }
}
