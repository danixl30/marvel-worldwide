import { ApiProperty } from '@nestjs/swagger'
import { IsDate, IsEmail, IsString } from 'class-validator'
import { UserTypes } from 'src/user/model/user'

export class CreateUserDTO {
    @ApiProperty()
    @IsEmail()
    email: string
    @ApiProperty()
    @IsString()
    password: string
    @ApiProperty()
    type: UserTypes
    @ApiProperty()
    cardNumber: string
    @ApiProperty()
    //@IsDate()
    birthDate: Date
}
