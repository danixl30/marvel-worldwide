import { ActorRoleType } from 'src/movie/domain/entities/actor/value-objects/actor.role'
import { OrgParticipationType } from 'src/movie/domain/value-objects/organization'

export type CreateMovieDTO = {
    title: string
    synopsis: string
    release: Date
    creator: string
    duration: {
        hours: number
        minutes: number
        seconds: number
    }
    type: string
    cost: {
        cost: number
        earning: number
    }
    directorName: string
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
