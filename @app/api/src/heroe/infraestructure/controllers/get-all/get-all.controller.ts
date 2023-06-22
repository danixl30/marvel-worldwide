import { ControllerContract } from 'src/core/infraestructure/controllers/controller-model/controller.contract'
import { HeroePostgresRepository } from '../../repositories/heroe.postgres.repository'
import { Controller, Get, UseGuards } from '@nestjs/common'
import { HEROE_ROUTE, HEROE_TAG } from '../prefix'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { AuthCuard } from 'src/user/infraestructure/guards/auth.guard'
import { GetAllHeroesResponse } from 'src/heroe/application/queries/get-all/types/response'
import { GetAllHeroesQuery } from 'src/heroe/application/queries/get-all/get.all'

@Controller(HEROE_ROUTE)
@ApiTags(HEROE_TAG)
export class GetAllHeroesController
    implements ControllerContract<undefined, GetAllHeroesResponse>
{
    constructor(private heroeRepository: HeroePostgresRepository) {}

    @Get('all')
    @ApiHeader({ name: 'auth' })
    @UseGuards(AuthCuard)
    async execute(): Promise<GetAllHeroesResponse> {
        const resp = await new GetAllHeroesQuery(this.heroeRepository).execute()
        return resp.unwrap()
    }
}
