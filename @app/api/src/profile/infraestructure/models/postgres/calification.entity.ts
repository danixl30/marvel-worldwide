import { Column, Entity, JoinTable, ManyToOne, PrimaryColumn } from 'typeorm'
import { Profile } from './profile.entity'

@Entity()
export class Calification {
    @PrimaryColumn({
        type: 'uuid',
    })
    idMemdia: string
    @PrimaryColumn({
        type: 'uuid',
    })
    @ManyToOne(() => Profile)
    @JoinTable({
        name: 'id',
    })
    idProfile: string
    @Column({
        type: 'int',
        length: 1,
    })
    rating: number
}
