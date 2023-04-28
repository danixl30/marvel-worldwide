export type CreateOrganizationDTO = {
    name: string
    leader: string
    objetive: string
    slogan: string
    founder: string
    creationPlace: string
    headquarterId?: string
    headquarter?: {
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
