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
    birthDate: Date
    cardNumber: string
    membreship: Membreship
    profiles: {
        value: string
    }[]
}
