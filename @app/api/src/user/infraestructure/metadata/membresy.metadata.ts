import { SetMetadata } from '@nestjs/common'
import { UserTypes } from 'src/user/model/user'

export const Membresies = (...membresies: UserTypes[]) =>
    SetMetadata('membresies', membresies)
