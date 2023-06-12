import { ControllerContract } from 'src/core/infraestructure/controllers/controller-model/controller.contract'
import { GetMovieByIdResponse } from 'src/movie/application/queries/get-by-id/types/response'
import { MoviePostgresRepository } from '../../repositories/movie.postgres.repository'
import { GetMovieByIdQuery } from 'src/movie/application/queries/get-by-id/get.movie.id'
import { VillainPostgresRepository } from 'src/villain/infraestructure/repositories/villain.postgres.repository'
import { HeroePostgresRepository } from 'src/heroe/infraestructure/repositories/heroe.postgres.repository'
import { CivilPostgresRepository } from 'src/civil/infraestructure/repositories/civil.postgres.repository'
import { OrganizationPostgresRepository } from 'src/organization/infraestructure/repositories/organization.postgres.repository'
import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { MOVIE_ROUTE, MOVIE_TAG } from '../prefix'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { AuthCuard } from 'src/user/infraestructure/guards/auth.guard'

@Controller(MOVIE_ROUTE)
@ApiTags(MOVIE_TAG)
export class GetMovieByIdController
    implements ControllerContract<string, GetMovieByIdResponse>
{
    constructor(
        private movieRepository: MoviePostgresRepository,
        private heroeRepository: HeroePostgresRepository,
        private villainRepository: VillainPostgresRepository,
        private civilRepository: CivilPostgresRepository,
        private organizationRepository: OrganizationPostgresRepository,
    ) {}

    @Get('detail/:id')
    @ApiHeader({ name: 'auth' })
    @UseGuards(AuthCuard)
    async execute(@Param('id') id: string): Promise<GetMovieByIdResponse> {
        const resp = await new GetMovieByIdQuery(
            this.movieRepository,
            this.heroeRepository,
            this.villainRepository,
            this.civilRepository,
            this.organizationRepository,
        ).execute({
            id,
        })
        return resp.unwrap()
    }
}
