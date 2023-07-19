import { ControllerContract } from 'src/core/infraestructure/controllers/controller-model/controller.contract'
import { MoviePostgresRepository } from '../../repositories/movie.postgres.repository'
import { Controller, Get, UseGuards } from '@nestjs/common'
import { MOVIE_ROUTE, MOVIE_TAG } from '../prefix'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { AuthCuard } from 'src/user/infraestructure/guards/auth.guard'
import { Profile } from 'src/profile/domain/profile'
import { GetMoviesTop10HistoryResponse } from 'src/movie/application/queries/get-top-10-history/types/response'
import { GetProfile } from 'src/profile/infraestructure/decorators/get.profile'
import { GetMoviesTop10HistoryQuery } from 'src/movie/application/queries/get-top-10-history/get.top.10.history'
import { ProfileGuard } from 'src/profile/infraestructure/guards/profile.guard'

@Controller(MOVIE_ROUTE)
@ApiTags(MOVIE_TAG)
export class GetMoviesTop10History
    implements ControllerContract<Profile, GetMoviesTop10HistoryResponse>
{
    constructor(private movieRepository: MoviePostgresRepository) {}

    @Get('top/10/history')
    @ApiHeader({ name: 'auth' })
    @UseGuards(AuthCuard, ProfileGuard)
    async execute(
        @GetProfile() profile: Profile,
    ): Promise<GetMoviesTop10HistoryResponse> {
        const resp = await new GetMoviesTop10HistoryQuery(
            this.movieRepository,
        ).execute({
            profileId: profile.id.value,
        })
        return resp.unwrap()
    }
}
