import { ControllerContract } from 'src/core/infraestructure/controllers/controller-model/controller.contract'
import { GetMovies2WResponse } from 'src/movie/application/queries/get-2w/types/response'
import { MoviePostgresRepository } from '../../repositories/movie.postgres.repository'
import { GetMoviesByCriteriaResponse } from 'src/movie/application/queries/get-by-criteria/types/response'
import { GetMovies2WQuery } from 'src/movie/application/queries/get-2w/get.2W.movies'
import { Controller, Get, UseGuards } from '@nestjs/common'
import { MOVIE_ROUTE, MOVIE_TAG } from '../prefix'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { AuthCuard } from 'src/user/infraestructure/guards/auth.guard'

@Controller(MOVIE_ROUTE)
@ApiTags(MOVIE_TAG)
export class GetMovies2WNearController
    implements ControllerContract<undefined, GetMovies2WResponse>
{
    constructor(private movieRepository: MoviePostgresRepository) {}

    @Get('2w/near')
    @ApiHeader({ name: 'auth' })
    @UseGuards(AuthCuard)
    async execute(): Promise<GetMoviesByCriteriaResponse> {
        const resp = await new GetMovies2WQuery(this.movieRepository).execute()
        return resp.unwrap()
    }
}
