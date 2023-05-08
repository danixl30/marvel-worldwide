import { ProfileId } from 'src/profile/domain/value-objects/profile.id'

export enum UserTypes {
    INVITED = 'INVITED',
    GOLD = 'GOLD',
    PREMIUM = 'PREMIUM',
    VIP = 'VIP',
}

export type User = {
    id: string
    email: string
    password: string
    birthDate: Date
    cardNumber: number
    expirationDate: Date
    profiles: ProfileId[]
    type: UserTypes
}
