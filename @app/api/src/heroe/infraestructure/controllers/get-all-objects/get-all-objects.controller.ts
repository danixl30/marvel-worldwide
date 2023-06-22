import { ControllerContract } from 'src/core/infraestructure/controllers/controller-model/controller.contract'
import { HeroePostgresRepository } from '../../repositories/heroe.postgres.repository'
import { Controller, Get, UseGuards } from '@nestjs/common'
import { HEROE_ROUTE, HEROE_TAG } from '../prefix'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { AuthCuard } from 'src/user/infraestructure/guards/auth.guard'
import { GetAllObjectsResponse } from 'src/heroe/application/queries/get-all-objects/types/response'
import { GetAllObjectsQuery } from 'src/heroe/application/queries/get-all-objects/get.all.objects'

@Controller(HEROE_ROUTE)
@ApiTags(HEROE_TAG)
export class GetAllObjectsController
    implements ControllerContract<undefined, GetAllObjectsResponse>
{
    constructor(private heroeRepository: HeroePostgresRepository) {}

    @Get('object/all')
    @ApiHeader({ name: 'auth' })
    @UseGuards(AuthCuard)
    async execute(): Promise<GetAllObjectsResponse> {
        const resp = await new GetAllObjectsQuery(
            this.heroeRepository,
        ).execute()
        return resp.unwrap()
    }
}
