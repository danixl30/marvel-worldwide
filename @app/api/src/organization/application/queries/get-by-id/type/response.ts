export type GetOrganizationByIdResponse = {
    id: string
    name: string
    leader: string
    objetive: string
    slogan: string
    founder: string
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
        charge: string
    }[]
    firstApparition: string
}
