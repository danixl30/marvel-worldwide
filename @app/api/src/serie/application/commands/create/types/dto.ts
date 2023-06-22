import { ActorRoleType } from 'src/movie/domain/entities/actor/value-objects/actor.role'
import { OrgParticipationType } from 'src/movie/domain/value-objects/organization'

export type CreateSerieDTO = {
    title: string
    synopsis: string
    release: Date
    creator: string
    episodes: number
    type: string
    channel: string
    comic: string
    actors: {
        name: {
            firstName: string
            lastName: string
        }
        role: ActorRoleType
        character: {
            id: string
            kind: string
        }
    }[]
    organizations: {
        id: string
        participationType: OrgParticipationType
    }[]
}
