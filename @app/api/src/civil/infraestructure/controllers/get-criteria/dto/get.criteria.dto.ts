import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class GetByCriteria {
    @ApiProperty()
    @IsString()
    term: string
    @ApiProperty()
    page?: number
    @ApiProperty()
    limit?: number
}
