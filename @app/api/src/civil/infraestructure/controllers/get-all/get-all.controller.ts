import { ControllerContract } from 'src/core/infraestructure/controllers/controller-model/controller.contract'
import { CivilPostgresRepository } from '../../repositories/civil.postgres.repository'
import { Controller, Get, UseGuards } from '@nestjs/common'
import { CIVIL_ROUTE, CIVIL_TAG } from '../prefix'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { AuthCuard } from 'src/user/infraestructure/guards/auth.guard'
import { GetAllCivilsResponse } from 'src/civil/application/queries/get-all/types/response'
import { GetAllCivilsQuery } from 'src/civil/application/queries/get-all/get.all.civils'

@Controller(CIVIL_ROUTE)
@ApiTags(CIVIL_TAG)
export class GetAllCivilsController
    implements ControllerContract<undefined, GetAllCivilsResponse>
{
    constructor(private civilRepository: CivilPostgresRepository) {}

    @Get('all')
    @ApiHeader({ name: 'auth' })
    @UseGuards(AuthCuard)
    async execute(): Promise<GetAllCivilsResponse> {
        const resp = await new GetAllCivilsQuery(this.civilRepository).execute()
        return resp.unwrap()
    }
}
