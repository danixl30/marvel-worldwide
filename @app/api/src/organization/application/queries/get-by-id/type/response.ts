export type GetOrganizationByIdResponse = {
    id: string
    name: string
    leader: {
        id: string
        name: string
        kind: string
    }
    objetive: string
    slogan: string
    founder: {
        id: string
        name: string
        kind: string
    }
    creationPlace: string
    headquarter: {
        id: string
        name: string
        place: {
            country: string
            city: string
        }
        kind: string
    }
    members: {
        id: string
        name: string
        kind: string
        charge: string
    }[]
    firstApparition: string
}
