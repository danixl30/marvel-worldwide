import { ControllerContract } from 'src/core/infraestructure/controllers/controller-model/controller.contract'
import { HeroePostgresRepository } from '../../repositories/heroe.postgres.repository'
import { Controller, Get, UseGuards } from '@nestjs/common'
import { HEROE_ROUTE, HEROE_TAG } from '../prefix'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { AuthCuard } from 'src/user/infraestructure/guards/auth.guard'
import { GetAllPowersResponse } from 'src/heroe/application/queries/get-all-powers/types/response'
import { GetAllPowersQuery } from 'src/heroe/application/queries/get-all-powers/get.all.powers'

@Controller(HEROE_ROUTE)
@ApiTags(HEROE_TAG)
export class GetAllPowersController
    implements ControllerContract<undefined, GetAllPowersResponse>
{
    constructor(private heroeRepository: HeroePostgresRepository) {}

    @Get('power/all')
    @ApiHeader({ name: 'auth' })
    @UseGuards(AuthCuard)
    async execute(): Promise<GetAllPowersResponse> {
        const resp = await new GetAllPowersQuery(this.heroeRepository).execute()
        return resp.unwrap()
    }
}
