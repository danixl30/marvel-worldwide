import { ProfileId } from 'src/profile/domain/value-objects/profile.id'

export enum UserTypes {
    INVITED = 'INVITED',
    GOLD = 'GOLD',
    PREMIUM = 'PREMIUM',
    VIP = 'VIP',
}

export type Membreship = {
    id: string
    initialDate: Date
    endDate: Date
    type: UserTypes
}

export type User = {
    id: string
    email: string
    password: string
    birthDate: Date
    cardNumber: string
    membreship: Membreship
    profiles: ProfileId[]
}
