import { ControllerContract } from 'src/core/infraestructure/controllers/controller-model/controller.contract'
import { GetTop5MoreUsedObjectsResponse } from 'src/heroe/application/queries/get-top5-more-used-objects/types/response'
import { HeroePostgresRepository } from '../../repositories/heroe.postgres.repository'
import { GetTop5MoreUsedObjectsQuery } from 'src/heroe/application/queries/get-top5-more-used-objects/get.top.more.objects'
import { Controller, Get, UseGuards } from '@nestjs/common'
import { HEROE_ROUTE, HEROE_TAG } from '../prefix'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { AuthCuard } from 'src/user/infraestructure/guards/auth.guard'

@Controller(HEROE_ROUTE)
@ApiTags(HEROE_TAG)
export class GetTop5MoreUsedObjectsController
    implements ControllerContract<undefined, GetTop5MoreUsedObjectsResponse>
{
    constructor(private readonly heroeRepository: HeroePostgresRepository) {}

    @Get('top5/user/powers')
    @ApiHeader({ name: 'auth' })
    @UseGuards(AuthCuard)
    async execute(): Promise<GetTop5MoreUsedObjectsResponse> {
        const resp = await new GetTop5MoreUsedObjectsQuery(
            this.heroeRepository,
        ).execute()
        return resp.unwrap()
    }
}
