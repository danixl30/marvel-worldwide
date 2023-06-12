import { ControllerContract } from 'src/core/infraestructure/controllers/controller-model/controller.contract'
import { DeleteMovieResponse } from 'src/movie/application/commands/delete/types/response'
import { MoviePostgresRepository } from '../../repositories/movie.postgres.repository'
import { EventHandlerNative } from 'src/core/infraestructure/event-handler/native/service/event.hadler.native.service'
import { DeleteMovieCommand } from 'src/movie/application/commands/delete/delete.movie'
import { Controller, Delete, Param, UseGuards } from '@nestjs/common'
import { MOVIE_ROUTE, MOVIE_TAG } from '../prefix'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { Membresies } from 'src/user/infraestructure/metadata/membresy.metadata'
import { UserTypes } from 'src/user/model/user'
import { MembersyGuard } from 'src/user/infraestructure/guards/membresy.guard'
import { AuthCuard } from 'src/user/infraestructure/guards/auth.guard'

@Controller(MOVIE_ROUTE)
@ApiTags(MOVIE_TAG)
export class DeleteMovieController
    implements ControllerContract<string, DeleteMovieResponse>
{
    constructor(
        private movieRepository: MoviePostgresRepository,
        private eventHandler: EventHandlerNative,
    ) {}

    @Delete(':id')
    @ApiHeader({ name: 'auth' })
    @Membresies(UserTypes.VIP)
    @UseGuards(AuthCuard, MembersyGuard)
    async execute(@Param('id') id: string): Promise<DeleteMovieResponse> {
        const resp = await new DeleteMovieCommand(
            this.movieRepository,
            this.eventHandler,
        ).execute({
            id,
        })
        return resp.unwrap()
    }
}
