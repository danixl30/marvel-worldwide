import { ApiProperty } from '@nestjs/swagger'
import { ActorRoleType } from 'src/movie/domain/entities/actor/value-objects/actor.role'
import { OrgParticipationType } from 'src/movie/domain/value-objects/organization'

export class ModifySerieDTO {
    @ApiProperty()
    id: string
    @ApiProperty()
    title?: string
    @ApiProperty()
    synopsis?: string
    @ApiProperty()
    release?: Date
    @ApiProperty()
    creator?: string
    @ApiProperty()
    episodes?: number
    @ApiProperty()
    type?: string
    @ApiProperty()
    channel?: string
    @ApiProperty()
    comic?: string
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
    actorsToRemove: string[]
    @ApiProperty()
    organizations: {
        id: string
        participationType: OrgParticipationType
    }[]
    organizationsToRemove: {
        id: string
        participationType: OrgParticipationType
    }[]
}
