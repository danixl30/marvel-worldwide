import { ControllerContract } from 'src/core/infraestructure/controllers/controller-model/controller.contract'
import { GetMovieByIdResponse } from 'src/movie/application/queries/get-by-id/types/response'
import { MoviePostgresRepository } from '../../repositories/movie.postgres.repository'
import { GetMovieByIdQuery } from 'src/movie/application/queries/get-by-id/get.movie.id'
import { VillainPostgresRepository } from 'src/villain/infraestructure/repositories/villain.postgres.repository'
import { HeroePostgresRepository } from 'src/heroe/infraestructure/repositories/heroe.postgres.repository'
import { CivilPostgresRepository } from 'src/civil/infraestructure/repositories/civil.postgres.repository'
import { OrganizationPostgresRepository } from 'src/organization/infraestructure/repositories/organization.postgres.repository'
import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { MOVIE_ROUTE, MOVIE_TAG } from '../prefix'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { AuthCuard } from 'src/user/infraestructure/guards/auth.guard'
import { ProfilePostgresRepository } from 'src/profile/infraestructure/repositories/profile.postgres.repository'
import { ConcreteUUIDGenerator } from 'src/core/infraestructure/UUID/service/concrete.UUID.generator'
import { EventHandlerNative } from 'src/core/infraestructure/event-handler/native/service/event.hadler.native.service'
import { AddHistoryCommand } from 'src/profile/application/commands/add-history/add.history'
import { ProfileGuard } from 'src/profile/infraestructure/guards/profile.guard'
import { GetProfile } from 'src/profile/infraestructure/decorators/get.profile'
import { Profile } from 'src/profile/domain/profile'

@Controller(MOVIE_ROUTE)
@ApiTags(MOVIE_TAG)
export class GetMovieByIdController
    implements
        ControllerContract<
            string | Profile,
            GetMovieByIdResponse & {
                history: string
            }
        >
{
    constructor(
        private movieRepository: MoviePostgresRepository,
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
        GetMovieByIdResponse & {
            history: string
        }
    > {
        const resp = await new GetMovieByIdQuery(
            this.movieRepository,
            this.heroeRepository,
            this.villainRepository,
            this.civilRepository,
            this.organizationRepository,
        ).execute({
            id,
        })
        const respHistory = await new AddHistoryCommand(
            this.profileRepository,
            this.uuidGen,
            this.eventHandler,
        ).execute({
            profileId: profile.id.value,
            target: id,
            kind: 'movie',
        })
        return {
            ...resp.unwrap(),
            history: respHistory.unwrap().historyId,
        }
    }
}
