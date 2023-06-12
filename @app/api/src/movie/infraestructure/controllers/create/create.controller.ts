import { ControllerContract } from 'src/core/infraestructure/controllers/controller-model/controller.contract'
import { CreateMovieDTO } from './dto/create.dto'
import { CreateMovieResponse } from 'src/movie/application/commands/create/types/response'
import { MoviePostgresRepository } from '../../repositories/movie.postgres.repository'
import { ConcreteUUIDGenerator } from 'src/core/infraestructure/UUID/service/concrete.UUID.generator'
import { EventHandlerNative } from 'src/core/infraestructure/event-handler/native/service/event.hadler.native.service'
import { CreateMovieCommand } from 'src/movie/application/commands/create/create.movie'
import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { MOVIE_ROUTE, MOVIE_TAG } from '../prefix'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { Membresies } from 'src/user/infraestructure/metadata/membresy.metadata'
import { UserTypes } from 'src/user/model/user'
import { MembersyGuard } from 'src/user/infraestructure/guards/membresy.guard'
import { AuthCuard } from 'src/user/infraestructure/guards/auth.guard'

@Controller(MOVIE_ROUTE)
@ApiTags(MOVIE_TAG)
export class CreateMovieController
    implements ControllerContract<CreateMovieDTO, CreateMovieResponse>
{
    constructor(
        private movieRepository: MoviePostgresRepository,
        private uuidGen: ConcreteUUIDGenerator,
        private eventHandler: EventHandlerNative,
    ) {}

    @Post('create')
    @ApiHeader({ name: 'auth' })
    @Membresies(UserTypes.VIP)
    @UseGuards(AuthCuard, MembersyGuard)
    async execute(@Body() data: CreateMovieDTO): Promise<CreateMovieResponse> {
        const resp = await new CreateMovieCommand(
            this.movieRepository,
            this.uuidGen,
            this.eventHandler,
        ).execute(data)
        return resp.unwrap()
    }
}
