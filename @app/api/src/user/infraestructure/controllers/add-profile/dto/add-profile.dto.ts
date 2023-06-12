import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, IsUUID } from 'class-validator'
import { MediaType } from 'src/profile/domain/entities/preference/value-objects/target'

export class AddProfileDTO {
    @ApiProperty()
    @IsEmail()
    email: string
    @ApiProperty()
    @IsString()
    language: string
    @ApiProperty()
    preferences: {
        kind: string
        platform: MediaType
    }[]
}
