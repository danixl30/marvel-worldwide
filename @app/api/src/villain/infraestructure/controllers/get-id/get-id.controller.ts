import { ControllerContract } from 'src/core/infraestructure/controllers/controller-model/controller.contract'
import { GetVillainByIdResponse } from 'src/villain/application/queries/get-by-id/types/response'
import { VillainPostgresRepository } from '../../repositories/villain.postgres.repository'
import { HeroePostgresRepository } from 'src/heroe/infraestructure/repositories/heroe.postgres.repository'
import { GetVillainByIdQuery } from 'src/villain/application/queries/get-by-id/get.villain.id'
import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { VILLAIN_ROUTE, VILLAIN_TAG } from '../prefix'
import { AuthCuard } from 'src/user/infraestructure/guards/auth.guard'

@Controller(VILLAIN_ROUTE)
@ApiTags(VILLAIN_TAG)
export class GetVillainByIdController
    implements ControllerContract<string, GetVillainByIdResponse>
{
    constructor(
        private villainRepository: VillainPostgresRepository,
        private heroeRepository: HeroePostgresRepository,
    ) {}

    @Get('detail/:id')
    @ApiHeader({ name: 'auth' })
    @UseGuards(AuthCuard)
    async execute(@Param('id') id: string): Promise<GetVillainByIdResponse> {
        const resp = await new GetVillainByIdQuery(
            this.villainRepository,
            this.heroeRepository,
        ).execute({
            id,
        })
        return resp.unwrap()
    }
}
