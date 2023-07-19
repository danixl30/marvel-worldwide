import { GetByCriteria } from 'src/civil/infraestructure/controllers/get-criteria/dto/get.criteria.dto'
import { ControllerContract } from 'src/core/infraestructure/controllers/controller-model/controller.contract'
import { GetMoviesByCriteriaResponse } from 'src/movie/application/queries/get-by-criteria/types/response'
import { MoviePostgresRepository } from '../../repositories/movie.postgres.repository'
import { GetMoviesByCriteriaQuery } from 'src/movie/application/queries/get-by-criteria/get.movie.criteria'
import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { MOVIE_ROUTE, MOVIE_TAG } from '../prefix'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { AuthCuard } from 'src/user/infraestructure/guards/auth.guard'

@Controller(MOVIE_ROUTE)
@ApiTags(MOVIE_TAG)
export class GetMoviesByCriteria
    implements ControllerContract<GetByCriteria, GetMoviesByCriteriaResponse>
{
    constructor(private movieRepository: MoviePostgresRepository) {}

    @Get('criteria')
    @ApiHeader({ name: 'auth' })
    @UseGuards(AuthCuard)
    async execute(
        @Query() data: GetByCriteria,
    ): Promise<GetMoviesByCriteriaResponse> {
        const resp = await new GetMoviesByCriteriaQuery(
            this.movieRepository,
        ).execute({
            term: data.term,
            pagination: {
                page: data.page || 1,
                limit: data.limit || 10,
            },
        })
        return resp.unwrap()
    }
}
