import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToOne,
    PrimaryColumn,
} from 'typeorm'
import { Profile } from './profile.entity'
import { Media } from 'src/movie/infraestructure/models/postgres/media.entity'

@Entity()
export class Calification {
    @ManyToOne(() => Media)
    @JoinColumn({
        name: 'idMedia',
    })
    media: Media
    @PrimaryColumn({
        type: 'uuid',
    })
    idMemdia: string
    @ManyToOne(() => Profile)
    @JoinTable({
        name: 'idProfile',
    })
    profile: Profile
    @PrimaryColumn({
        type: 'uuid',
    })
    idProfile: string
    @Column({
        type: 'int',
        length: 1,
    })
    rating: number
}
