import { ControllerContract } from 'src/core/infraestructure/controllers/controller-model/controller.contract'
import { GetVideogames2WResponse } from 'src/videogame/application/queries/get-2w/types/response'
import { VideogamePostgresRepository } from '../../repositories/videogame.postgres.repository'
import { GetVideogamesByCriterioResponse } from 'src/videogame/application/queries/get-by-criteria/types/response'
import { GetVideogames2WQuery } from 'src/videogame/application/queries/get-2w/get.2W.videogames'
import { Controller, Get, UseGuards } from '@nestjs/common'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { VIDEOGAME_ROUTE, VIDEOGAME_TAG } from '../prefix'
import { AuthCuard } from 'src/user/infraestructure/guards/auth.guard'

@Controller(VIDEOGAME_ROUTE)
@ApiTags(VIDEOGAME_TAG)
export class GetVideogames2WNearController
    implements ControllerContract<undefined, GetVideogames2WResponse>
{
    constructor(private videogameRepository: VideogamePostgresRepository) {}

    @Get('2w')
    @ApiHeader({ name: 'auth' })
    @UseGuards(AuthCuard)
    async execute(): Promise<GetVideogamesByCriterioResponse> {
        const resp = await new GetVideogames2WQuery(
            this.videogameRepository,
        ).execute()
        return resp.unwrap()
    }
}
