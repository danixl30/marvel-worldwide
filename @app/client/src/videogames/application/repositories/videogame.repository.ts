export type CreateVideogameDTO = {
    title: string
    synopsis: string
    release: Date
    creator: string
    type: string
    platforms: string[]
    comic: string
    actors: {
        name: {
            firstName: string
            lastName: string
        }
        role: string
        character: {
            id: string
            kind: string
        }
    }[]
    organizations: {
        id: string
        participationType: string
    }[]
}

export type VideogameRepository = {
    create(data: CreateVideogameDTO): Promise<void>
}
