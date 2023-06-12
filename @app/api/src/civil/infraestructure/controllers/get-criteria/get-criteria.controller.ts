import { ControllerContract } from 'src/core/infraestructure/controllers/controller-model/controller.contract'
import { GetByCriteria } from './dto/get.criteria.dto'
import { GetCivilsByCriteriaResponse } from 'src/civil/application/queries/get-by-criteria/types/response'
import { CivilPostgresRepository } from '../../repositories/civil.postgres.repository'
import { GetCivilsByCriteriaQuery } from 'src/civil/application/queries/get-by-criteria/get.civil.criteria'
import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { CIVIL_ROUTE, CIVIL_TAG } from '../prefix'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { AuthCuard } from 'src/user/infraestructure/guards/auth.guard'

@Controller(CIVIL_ROUTE)
@ApiTags(CIVIL_TAG)
export class GetCivilsByCriteriaController
    implements ControllerContract<GetByCriteria, GetCivilsByCriteriaResponse>
{
    constructor(private civilRepository: CivilPostgresRepository) {}

    @Get('criteria')
    @ApiHeader({ name: 'auth' })
    @UseGuards(AuthCuard)
    async execute(
        @Query() data: GetByCriteria,
    ): Promise<GetCivilsByCriteriaResponse> {
        const resp = await new GetCivilsByCriteriaQuery(
            this.civilRepository,
        ).execute(data)
        return resp.unwrap()
    }
}
