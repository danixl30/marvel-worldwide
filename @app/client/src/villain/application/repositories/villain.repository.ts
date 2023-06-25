import {
    ObjectDTO,
    PowerDTO,
} from '../../../heroe/application/repositories/heroe.repository'

export type VillainList = {
    id: string
    name: string
}

export type CreateVillainDTO = {
    person?: {
        name: string
        phrase: string
        lastName: string
        nationalities: string[]
        occupations: string[]
        hairColor: string
        eyesColor: string
        maritialStatus: string
        gender: string
    }
    personId?: string
    objectsId: string[]
    powersId: string[]
    objects: ObjectDTO[]
    powers: PowerDTO[]
    name: string
    creator: {
        firstName: string
        lastName: string
    }
    enemies: string[]
    enemieGroups: string[]
    objetive: string
    logo: string
}

export type GetVillainsThatHaveArtificialPowersAndLeaderResponse = {
    id: string
    name: string
    logo: string
}[]

export type VillainRepository = {
    create(data: CreateVillainDTO): Promise<void>
    getAll(): Promise<VillainList[]>
    getVillainsWithArtificialPowersAndLeader(): Promise<GetVillainsThatHaveArtificialPowersAndLeaderResponse>
}
