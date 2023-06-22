import { ControllerContract } from 'src/core/infraestructure/controllers/controller-model/controller.contract'
import { VillainPostgresRepository } from '../../repositories/villain.postgres.repository'
import { Controller, Get, UseGuards } from '@nestjs/common'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { VILLAIN_ROUTE, VILLAIN_TAG } from '../prefix'
import { AuthCuard } from 'src/user/infraestructure/guards/auth.guard'
import { GetAllVillainsResponse } from 'src/villain/application/queries/get-all/types/response'
import { GetAllVillainsQuery } from 'src/villain/application/queries/get-all/get.all'

@Controller(VILLAIN_ROUTE)
@ApiTags(VILLAIN_TAG)
export class GetAllVillainsController
    implements ControllerContract<undefined, GetAllVillainsResponse>
{
    constructor(private villainRepository: VillainPostgresRepository) {}

    @Get('all')
    @ApiHeader({ name: 'auth' })
    @UseGuards(AuthCuard)
    async execute(): Promise<GetAllVillainsResponse> {
        const resp = await new GetAllVillainsQuery(
            this.villainRepository,
        ).execute()
        return resp.unwrap()
    }
}
