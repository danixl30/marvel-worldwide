import { ControllerContract } from 'src/core/infraestructure/controllers/controller-model/controller.contract'
import { GetMoviesThatIsAnimatedAnd2hAndHalfMoreResponse } from 'src/movie/application/queries/get-movies-2h-animated/types/response'
import { MoviePostgresRepository } from '../../repositories/movie.postgres.repository'
import { GetMoviesByCriteriaResponse } from 'src/movie/application/queries/get-by-criteria/types/response'
import { GetMoviesThatIsAnimatedAnd2hAndHalfMoreQuery } from 'src/movie/application/queries/get-movies-2h-animated/get.movies.2h.animated'
import { Controller, Get, UseGuards } from '@nestjs/common'
import { MOVIE_ROUTE, MOVIE_TAG } from '../prefix'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { AuthCuard } from 'src/user/infraestructure/guards/auth.guard'

@Controller(MOVIE_ROUTE)
@ApiTags(MOVIE_TAG)
export class GetMovieMore2HAnimated
    implements
        ControllerContract<
            undefined,
            GetMoviesThatIsAnimatedAnd2hAndHalfMoreResponse
        >
{
    constructor(private movieRepository: MoviePostgresRepository) {}

    @Get('2h/animated')
    @ApiHeader({ name: 'auth' })
    @UseGuards(AuthCuard)
    async execute(): Promise<GetMoviesByCriteriaResponse> {
        const resp = await new GetMoviesThatIsAnimatedAnd2hAndHalfMoreQuery(
            this.movieRepository,
        ).execute()
        return resp.unwrap()
    }
}
