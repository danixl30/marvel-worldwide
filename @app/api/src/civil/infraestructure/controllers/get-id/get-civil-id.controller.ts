import { GetCivilByIdResponse } from 'src/civil/application/queries/get-civil-id/types/response'
import { ControllerContract } from 'src/core/infraestructure/controllers/controller-model/controller.contract'
import { CivilPostgresRepository } from '../../repositories/civil.postgres.repository'
import { GetCivilByIdQuery } from 'src/civil/application/queries/get-civil-id/get.civil.id'
import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { CIVIL_ROUTE, CIVIL_TAG } from '../prefix'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { AuthCuard } from 'src/user/infraestructure/guards/auth.guard'

@Controller(CIVIL_ROUTE)
@ApiTags(CIVIL_TAG)
export class GetCivilByIdController
    implements ControllerContract<string, GetCivilByIdResponse>
{
    constructor(private civilRepository: CivilPostgresRepository) {}

    @Get('detail/:id')
    @ApiHeader({ name: 'auth' })
    @UseGuards(AuthCuard)
    async execute(@Param('id') id: string): Promise<GetCivilByIdResponse> {
        const resp = await new GetCivilByIdQuery(this.civilRepository).execute({
            id,
        })
        return resp.unwrap()
    }
}
