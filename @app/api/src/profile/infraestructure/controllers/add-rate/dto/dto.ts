import { ApiProperty } from '@nestjs/swagger'
import { IsUUID } from 'class-validator'

export class AddRateDTO {
    @ApiProperty()
    @IsUUID()
    target: string
    @ApiProperty()
    kind: string
    @ApiProperty()
    calification: number
}
