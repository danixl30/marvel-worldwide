import { ControllerContract } from 'src/core/infraestructure/controllers/controller-model/controller.contract'
import { GetMoviesTrendingResponse } from 'src/movie/application/queries/get-trending/types/response'
import { Profile } from 'src/profile/domain/profile'
import { MoviePostgresRepository } from '../../repositories/movie.postgres.repository'
import { GetMoviesByCriteriaResponse } from 'src/movie/application/queries/get-by-criteria/types/response'
import { GetMoviesTrendingQuery } from 'src/movie/application/queries/get-trending/get.trending'
import { Controller, Get, UseGuards } from '@nestjs/common'
import { MOVIE_ROUTE, MOVIE_TAG } from '../prefix'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { AuthCuard } from 'src/user/infraestructure/guards/auth.guard'
import { ProfileGuard } from 'src/profile/infraestructure/guards/profile.guard'
import { GetProfile } from 'src/profile/infraestructure/decorators/get.profile'

@Controller(MOVIE_ROUTE)
@ApiTags(MOVIE_TAG)
export class GetMoviesTrendingController
    implements ControllerContract<Profile, GetMoviesTrendingResponse>
{
    constructor(private movieRepository: MoviePostgresRepository) {}

    @Get('trending')
    @ApiHeader({ name: 'auth' })
    @ApiHeader({ name: 'profile' })
    @UseGuards(AuthCuard, ProfileGuard)
    async execute(
        @GetProfile() profile: Profile,
    ): Promise<GetMoviesByCriteriaResponse> {
        const resp = await new GetMoviesTrendingQuery(
            this.movieRepository,
        ).execute({
            profileId: profile.id.value,
        })
        return resp.unwrap()
    }
}
