import { GetByCriteriaDTO } from '../../../civil/application/repositories/civil.repository'

export type PowerList = {
    id: string
    name: string
}

export type ObjectList = {
    id: string
    name: string
}

export type HeroeList = {
    id: string
    name: string
}

export type ObjectDTO = {
    name: string
    description: string
    material: string
    creator: string
    kind: string
}

export type PowerDTO = {
    name: string
    description: string
    type: string
}

export type CreateHeroeDTO = {
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
    archEnemy: string
    phrase: string
    colors: string[]
    logo: string
}

export type GetHeroesThatHaveArtificialPowersAndLeaderResponse = {
    id: string
    name: string
    logo: string
}[]

export type GetTop5MoreUsedObjectsResponse = {
    id: string
    name: string
    type: string
    creator: string
    material: string
}[]

export type GetHeroeByIdResponse = {
    id: string
    person: {
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
    logo: string
    objects: ({ id: string } & ObjectDTO)[]
    powers: ({ id: string } & PowerDTO)[]
    name: string
    creator: {
        firstName: string
        lastName: string
    }
    archEnemy: {
        id: string
        name: string
    }
    colors: string[]
}

export type GetHeroesByCriteriaResponse = {
    id: string
    name: string
    logo: string
}[]

export type ModifyHeroeDTO = {
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
    archEnemy?: string
    phrase?: string
    colors: string[]
    logo?: string
}

export type HeroeRepository = {
    create(data: CreateHeroeDTO): Promise<void>
    getAll(): Promise<HeroeList[]>
    getAllPowers(): Promise<PowerList[]>
    getAllObjects(): Promise<ObjectList[]>
    getHeroesWithArtificialPowersAndLeader(): Promise<GetHeroesThatHaveArtificialPowersAndLeaderResponse>
    getTop5MoreUsedObjects(): Promise<GetTop5MoreUsedObjectsResponse>
    getById(id: string): Promise<GetHeroeByIdResponse>
    getByCriteria(dto: GetByCriteriaDTO): Promise<GetHeroesByCriteriaResponse>
    modify(data: ModifyHeroeDTO): Promise<void>
}
