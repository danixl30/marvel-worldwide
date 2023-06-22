import { ApiProperty } from '@nestjs/swagger'
import { ActorRoleType } from 'src/movie/domain/entities/actor/value-objects/actor.role'
import { OrgParticipationType } from 'src/movie/domain/value-objects/organization'

export class CreateMovieDTO {
    @ApiProperty()
    title: string
    @ApiProperty()
    synopsis: string
    @ApiProperty()
    release: Date
    @ApiProperty()
    creator: string
    @ApiProperty()
    duration: {
        hours: number
        minutes: number
        seconds: number
    }
    @ApiProperty()
    type: string
    @ApiProperty()
    cost: {
        cost: number
        earning: number
    }
    @ApiProperty()
    directorName: string
    @ApiProperty()
    comic: string
    @ApiProperty()
    actors: {
        name: {
            firstName: string
            lastName: string
        }
        role: ActorRoleType
        character: {
            id: string
            kind: string
        }
    }[]
    @ApiProperty()
    organizations: {
        id: string
        participationType: OrgParticipationType
    }[]
}
