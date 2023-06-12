import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Civil } from 'src/civil/infraestructure/models/postgres/civil.entity'
import { CivilPostgresRepository } from 'src/civil/infraestructure/repositories/civil.postgres.repository'
import { Combat } from 'src/combat/infraestructure/models/postgres/combat.entity'
import { Participate } from 'src/combat/infraestructure/models/postgres/participate.entity'
import { Utilize } from 'src/combat/infraestructure/models/postgres/utilize.entity'
import { CombatPostgresRepository } from 'src/combat/infraestructure/repository/combat.postgres.repository'
import { Heroe } from 'src/heroe/infraestructure/models/postgres/heroe.entity'
import { Nationality } from 'src/heroe/infraestructure/models/postgres/nationality.entity'
import { ObjectItem } from 'src/heroe/infraestructure/models/postgres/object.entity'
import { Ocupation } from 'src/heroe/infraestructure/models/postgres/ocupation.entity'
import { Own } from 'src/heroe/infraestructure/models/postgres/own.entity'
import { Person } from 'src/heroe/infraestructure/models/postgres/person.entity'
import { Power } from 'src/heroe/infraestructure/models/postgres/power.entity'
import { ColorSuit } from 'src/heroe/infraestructure/models/postgres/suit.color.entity'
import { Use } from 'src/heroe/infraestructure/models/postgres/use.entity'
import { HeroePostgresRepository } from 'src/heroe/infraestructure/repositories/heroe.postgres.repository'
import { Actor } from 'src/movie/infraestructure/models/postgres/actor.entity'
import { Appear } from 'src/movie/infraestructure/models/postgres/appear.entity'
import { Develop } from 'src/movie/infraestructure/models/postgres/develop.entity'
import { Movie } from 'src/movie/infraestructure/models/postgres/movie.entity'
import { Represent } from 'src/movie/infraestructure/models/postgres/represent.entity'
import { MoviePostgresRepository } from 'src/movie/infraestructure/repositories/movie.postgres.repository'
import { Belong } from 'src/organization/infraestructure/models/postgres/belong.entity'
import { Headquarter } from 'src/organization/infraestructure/models/postgres/headquarter.entity'
import { Lead } from 'src/organization/infraestructure/models/postgres/lead.entity'
import { Organization } from 'src/organization/infraestructure/models/postgres/organization.entity'
import { OrganizationPostgresRepository } from 'src/organization/infraestructure/repositories/organization.postgres.repository'
import { Calification } from 'src/profile/infraestructure/models/postgres/calification.entity'
import { History } from 'src/profile/infraestructure/models/postgres/history.entity'
import { Preference } from 'src/profile/infraestructure/models/postgres/preference.entity'
import { Profile } from 'src/profile/infraestructure/models/postgres/profile.entity'
import { ProfilePostgresRepository } from 'src/profile/infraestructure/repositories/profile.postgres.repository'
import { Serie } from 'src/serie/infraestructure/models/postgres/serie.entity'
import { SeriePostgresRepository } from 'src/serie/infraestructure/repositories/serie.postgres.repository'
import { Membership } from 'src/user/infraestructure/models/postgres/membership.entity'
import { User } from 'src/user/infraestructure/models/postgres/user.entity'
import { UserPostgresRepository } from 'src/user/infraestructure/repositories/user.postgres.repository'
import { Platform } from 'src/videogame/infraestructure/models/postgres/platform.entity'
import { Videogame } from 'src/videogame/infraestructure/models/postgres/videogame.entity'
import { VideogamePostgresRepository } from 'src/videogame/infraestructure/repositories/videogame.postgres.repository'
import { Antagonist } from 'src/villain/infraestructure/models/postgres/antagonist.entity'
import { AntagonistGroup } from 'src/villain/infraestructure/models/postgres/antagonist.group.entity'
import { Villain } from 'src/villain/infraestructure/models/postgres/villain.entity'
import { VillainPostgresRepository } from 'src/villain/infraestructure/repositories/villain.postgres.repository'

@Module({
    imports: [
        TypeOrmModule.forFeature([
            User,
            Profile,
            Membership,
            Heroe,
            Villain,
            Civil,
            Movie,
            Serie,
            Videogame,
            Own,
            Use,
            Represent,
            Develop,
            Organization,
            Combat,
            Participate,
            Utilize,
            Nationality,
            ObjectItem,
            Ocupation,
            Person,
            Power,
            ColorSuit,
            Actor,
            Appear,
            Belong,
            Headquarter,
            Lead,
            Calification,
            History,
            Preference,
            Platform,
            Antagonist,
            AntagonistGroup,
        ]),
    ],
    providers: [
        CivilPostgresRepository,
        CombatPostgresRepository,
        OrganizationPostgresRepository,
        UserPostgresRepository,
        ProfilePostgresRepository,
        HeroePostgresRepository,
        VillainPostgresRepository,
        MoviePostgresRepository,
        SeriePostgresRepository,
        VideogamePostgresRepository,
    ],
    exports: [
        CivilPostgresRepository,
        CombatPostgresRepository,
        OrganizationPostgresRepository,
        UserPostgresRepository,
        ProfilePostgresRepository,
        HeroePostgresRepository,
        VillainPostgresRepository,
        MoviePostgresRepository,
        SeriePostgresRepository,
        VideogamePostgresRepository,
    ],
})
export class PostgresRepositoriesModule {}
