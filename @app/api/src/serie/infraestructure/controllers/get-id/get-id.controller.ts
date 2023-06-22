import { ControllerContract } from 'src/core/infraestructure/controllers/controller-model/controller.contract'
import { GetSerieByIdResponse } from 'src/serie/application/queries/get-by-id/types/response'
import { SeriePostgresRepository } from '../../repositories/serie.postgres.repository'
import { HeroePostgresRepository } from 'src/heroe/infraestructure/repositories/heroe.postgres.repository'
import { VillainPostgresRepository } from 'src/villain/infraestructure/repositories/villain.postgres.repository'
import { CivilPostgresRepository } from 'src/civil/infraestructure/repositories/civil.postgres.repository'
import { OrganizationPostgresRepository } from 'src/organization/infraestructure/repositories/organization.postgres.repository'
import { GetSerieByIdQuery } from 'src/serie/application/queries/get-by-id/get.serie.id'
import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { SERIE_ROUTE, SERIE_TAG } from '../prefix'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { AuthCuard } from 'src/user/infraestructure/guards/auth.guard'
import { ProfilePostgresRepository } from 'src/profile/infraestructure/repositories/profile.postgres.repository'
import { ConcreteUUIDGenerator } from 'src/core/infraestructure/UUID/service/concrete.UUID.generator'
import { EventHandlerNative } from 'src/core/infraestructure/event-handler/native/service/event.hadler.native.service'
import { ProfileGuard } from 'src/profile/infraestructure/guards/profile.guard'
import { Profile } from 'src/profile/domain/profile'
import { GetProfile } from 'src/profile/infraestructure/decorators/get.profile'
import { AddHistoryCommand } from 'src/profile/application/commands/add-history/add.history'

@Controller(SERIE_ROUTE)
@ApiTags(SERIE_TAG)
export class GetSerieByIdController
    implements ControllerContract<string | Profile, GetSerieByIdResponse>
{
    constructor(
        private serieRepository: SeriePostgresRepository,
        private heroeRepository: HeroePostgresRepository,
        private villainRepository: VillainPostgresRepository,
        private civilRepository: CivilPostgresRepository,
        private organizationRepository: OrganizationPostgresRepository,
        private profileRepository: ProfilePostgresRepository,
        private uuidGen: ConcreteUUIDGenerator,
        private eventHandler: EventHandlerNative,
    ) {}

    @Get('detial/:id')
    @ApiHeader({ name: 'auth' })
    @ApiHeader({ name: 'profile' })
    @UseGuards(AuthCuard, ProfileGuard)
    async execute(
        @Param('id') id: string,
        @GetProfile() profile: Profile,
    ): Promise<GetSerieByIdResponse> {
        const resp = await new GetSerieByIdQuery(
            this.serieRepository,
            this.heroeRepository,
            this.villainRepository,
            this.civilRepository,
            this.organizationRepository,
        ).execute({
            id,
        })
        await new AddHistoryCommand(
            this.profileRepository,
            this.uuidGen,
            this.eventHandler,
        ).execute({
            profileId: profile.id.value,
            target: id,
            kind: 'serie',
        })
        return resp.unwrap()
    }
}
