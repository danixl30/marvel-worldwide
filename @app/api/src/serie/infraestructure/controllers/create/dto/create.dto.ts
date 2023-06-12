import { ApiProperty } from '@nestjs/swagger'
import { IsDate, IsNumber, IsString } from 'class-validator'

export class CreateSerieDTO {
    @ApiProperty()
    @IsString()
    title: string
    @ApiProperty()
    @IsString()
    synopsis: string
    @ApiProperty()
    @IsDate()
    release: Date
    @ApiProperty()
    @IsString()
    creator: string
    @ApiProperty()
    @IsNumber()
    episodes: number
    @ApiProperty()
    @IsString()
    type: string
    @ApiProperty()
    @IsString()
    channel: string
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
