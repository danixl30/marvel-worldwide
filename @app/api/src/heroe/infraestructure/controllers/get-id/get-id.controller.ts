import { ControllerContract } from 'src/core/infraestructure/controllers/controller-model/controller.contract'
import { GetHeroeByIdResponse } from 'src/heroe/application/queries/get-by-id/types/response'
import { HeroePostgresRepository } from '../../repositories/heroe.postgres.repository'
import { GetHeroeByIdQuery } from 'src/heroe/application/queries/get-by-id/get.heroe.id'
import { VillainPostgresRepository } from 'src/villain/infraestructure/repositories/villain.postgres.repository'
import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { HEROE_ROUTE, HEROE_TAG } from '../prefix'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { AuthCuard } from 'src/user/infraestructure/guards/auth.guard'

@Controller(HEROE_ROUTE)
@ApiTags(HEROE_TAG)
export class GetHeroeByIdController
    implements ControllerContract<string, GetHeroeByIdResponse>
{
    constructor(
        private heroeRepository: HeroePostgresRepository,
        private villainRepository: VillainPostgresRepository,
    ) {}

    @Get('details/:id')
    @ApiHeader({ name: 'auth' })
    @UseGuards(AuthCuard)
    async execute(@Param('id') id: string): Promise<GetHeroeByIdResponse> {
        const resp = await new GetHeroeByIdQuery(
            this.heroeRepository,
            this.villainRepository,
        ).execute({
            id,
        })
        return resp.unwrap()
    }
}
