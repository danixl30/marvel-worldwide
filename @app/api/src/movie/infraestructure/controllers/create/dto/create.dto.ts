import { ApiProperty } from '@nestjs/swagger'

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
        role: string
        character: {
            id: string
            kind: string
        }
    }[]
    @ApiProperty()
    organizations: {
        id: string
        participationType: string
    }[]
}
