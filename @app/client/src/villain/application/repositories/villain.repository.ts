import { GetByCriteriaDTO } from '../../../civil/application/repositories/civil.repository'
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

export type GetVillainByIdResponse = {
    id: string
    person: {
        id: string
        phrase: string
        name: string
        lastName: string
        nationalities: string[]
        occupations: string[]
        hairColor: string
        eyesColor: string
        maritialStatus: string
        gender: string
    }
    objects: ({ id: string } & ObjectDTO)[]
    powers: ({ id: string } & PowerDTO)[]
    name: string
    enemies: {
        id: string
        name: string
    }[]
    enemieGroups: string[]
    objetive: string
    logo: string
}

export type GetVillainsByCriteriaResponse = {
    id: string
    name: string
    objetive: string
    logo: string
}[]

export type GetSuperInheritedPowersResponse = {
    id: string
    name: string
    description: string
    type: string
}[]

export type ModifyVillainDTO = {
    id: string
    person?: {
        name?: string
        phrase?: string
        lastName?: string
        nationalities?: string[]
        occupations?: string[]
        hairColor?: string
        eyesColor?: string
        maritialStatus?: string
        gender?: string
    }
    personId?: string
    objectsIdToAdd: string[]
    powersIdToAdd: string[]
    objectsIdToRemove: string[]
    powersIdToRemove: string[]
    objects: ObjectDTO[]
    powers: PowerDTO[]
    name?: string
    creator?: {
        firstName: string
        lastName: string
    }
    enemiesToAdd: string[]
    enemiesToRemove: string[]
    enemieGroups: string[]
    objetive?: string
    logo?: string
}

export type VillainRepository = {
    create(data: CreateVillainDTO): Promise<void>
    getAll(): Promise<VillainList[]>
    getVillainsWithArtificialPowersAndLeader(): Promise<GetVillainsThatHaveArtificialPowersAndLeaderResponse>
    getById(id: string): Promise<GetVillainByIdResponse>
    getByCriteria(dto: GetByCriteriaDTO): Promise<GetVillainsByCriteriaResponse>
    getSuperPowers(): Promise<GetSuperInheritedPowersResponse>
    modify(data: ModifyVillainDTO): Promise<void>
}
