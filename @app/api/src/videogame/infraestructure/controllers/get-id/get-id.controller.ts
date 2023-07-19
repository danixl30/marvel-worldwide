import { ControllerContract } from 'src/core/infraestructure/controllers/controller-model/controller.contract'
import { GetVideogameByIdResponse } from 'src/videogame/application/queries/get-by-id/types/response'
import { VideogamePostgresRepository } from '../../repositories/videogame.postgres.repository'
import { HeroePostgresRepository } from 'src/heroe/infraestructure/repositories/heroe.postgres.repository'
import { VillainPostgresRepository } from 'src/villain/infraestructure/repositories/villain.postgres.repository'
import { CivilPostgresRepository } from 'src/civil/infraestructure/repositories/civil.postgres.repository'
import { OrganizationPostgresRepository } from 'src/organization/infraestructure/repositories/organization.postgres.repository'
import { GetVideogameByIdQuery } from 'src/videogame/application/queries/get-by-id/get.videogame.id'
import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { VIDEOGAME_ROUTE, VIDEOGAME_TAG } from '../prefix'
import { AuthCuard } from 'src/user/infraestructure/guards/auth.guard'
import { ProfilePostgresRepository } from 'src/profile/infraestructure/repositories/profile.postgres.repository'
import { ConcreteUUIDGenerator } from 'src/core/infraestructure/UUID/service/concrete.UUID.generator'
import { EventHandlerNative } from 'src/core/infraestructure/event-handler/native/service/event.hadler.native.service'
import { Profile } from 'src/profile/domain/profile'
import { GetProfile } from 'src/profile/infraestructure/decorators/get.profile'
import { ProfileGuard } from 'src/profile/infraestructure/guards/profile.guard'
import { AddHistoryCommand } from 'src/profile/application/commands/add-history/add.history'

@Controller(VIDEOGAME_ROUTE)
@ApiTags(VIDEOGAME_TAG)
export class GetVideogameByIdController
    implements
        ControllerContract<
            string | Profile,
            GetVideogameByIdResponse & {
                history: string
            }
        >
{
    constructor(
        private videogameRepository: VideogamePostgresRepository,
        private heroeRepository: HeroePostgresRepository,
        private villainRepository: VillainPostgresRepository,
        private civilRepository: CivilPostgresRepository,
        private organizationRepository: OrganizationPostgresRepository,
        private profileRepository: ProfilePostgresRepository,
        private uuidGen: ConcreteUUIDGenerator,
        private eventHandler: EventHandlerNative,
    ) {}

    @Get('detail/:id')
    @ApiHeader({ name: 'auth' })
    @ApiHeader({ name: 'profile' })
    @UseGuards(AuthCuard, ProfileGuard)
    async execute(
        @Param('id') id: string,
        @GetProfile() profile: Profile,
    ): Promise<
        GetVideogameByIdResponse & {
            history: string
        }
    > {
        const resp = await new GetVideogameByIdQuery(
            this.videogameRepository,
            this.heroeRepository,
            this.villainRepository,
            this.civilRepository,
            this.organizationRepository,
        ).execute({
            id,
        })
        const historyResp = await new AddHistoryCommand(
            this.profileRepository,
            this.uuidGen,
            this.eventHandler,
        ).execute({
            profileId: profile.id.value,
            target: id,
            kind: 'videogame',
        })
        return {
            ...resp.unwrap(),
            history: historyResp.unwrap().historyId,
        }
    }
}
