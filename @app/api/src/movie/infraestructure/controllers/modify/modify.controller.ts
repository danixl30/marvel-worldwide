import { ControllerContract } from 'src/core/infraestructure/controllers/controller-model/controller.contract'
import { CreateMovieResponse } from 'src/movie/application/commands/create/types/response'
import { MoviePostgresRepository } from '../../repositories/movie.postgres.repository'
import { ConcreteUUIDGenerator } from 'src/core/infraestructure/UUID/service/concrete.UUID.generator'
import { EventHandlerNative } from 'src/core/infraestructure/event-handler/native/service/event.hadler.native.service'
import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common'
import { MOVIE_ROUTE, MOVIE_TAG } from '../prefix'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { Membresies } from 'src/user/infraestructure/metadata/membresy.metadata'
import { UserTypes } from 'src/user/model/user'
import { MembersyGuard } from 'src/user/infraestructure/guards/membresy.guard'
import { AuthCuard } from 'src/user/infraestructure/guards/auth.guard'
import { ModifyMovieDTO } from './dto/dto'
import { ModifyMovieCommand } from 'src/movie/application/commands/modify/modify.movie'

@Controller(MOVIE_ROUTE)
@ApiTags(MOVIE_TAG)
export class ModifyMovieController
    implements ControllerContract<ModifyMovieDTO, CreateMovieResponse>
{
    constructor(
        private movieRepository: MoviePostgresRepository,
        private uuidGen: ConcreteUUIDGenerator,
        private eventHandler: EventHandlerNative,
    ) {}

    @Put('modify')
    @ApiHeader({ name: 'auth' })
    @Membresies(UserTypes.VIP)
    @UseGuards(AuthCuard, MembersyGuard)
    async execute(@Body() data: ModifyMovieDTO): Promise<CreateMovieResponse> {
        const resp = await new ModifyMovieCommand(
            this.movieRepository,
            this.uuidGen,
            this.eventHandler,
        ).execute(data)
        return resp.unwrap()
    }
}
