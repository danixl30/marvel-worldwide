import { Column, Entity, JoinTable, ManyToOne, PrimaryColumn } from 'typeorm'
import { Profile } from './profile.entity'

@Entity()
export class History {
    @PrimaryColumn({
        type: 'uuid',
    })
    @ManyToOne(() => Profile)
    @JoinTable({
        name: 'id',
    })
    idProfile: string
    @PrimaryColumn({
        type: 'uuid',
    })
    idMedia: string
    @Column({
        type: 'timestamp',
    })
    initDate: Date
    @Column({
        type: 'timestamp',
    })
    endDate: Date
    @Column({
        type: 'varchar',
    })
    device: string
}
