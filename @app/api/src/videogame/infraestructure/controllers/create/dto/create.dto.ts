import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class CreateVideogameDTO {
    @ApiProperty()
    @IsString()
    title: string
    @ApiProperty()
    @IsString()
    synopsis: string
    @ApiProperty()
    @IsString()
    release: Date
    @ApiProperty()
    @IsString()
    creator: string
    @ApiProperty()
    @IsString()
    type: string
    @ApiProperty()
    platforms: string[]
    @ApiProperty()
    @IsString()
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
