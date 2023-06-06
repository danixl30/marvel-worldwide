import { UserTypes } from 'src/user/model/user'
import { Column, Entity, JoinTable, ManyToOne, PrimaryColumn } from 'typeorm'
import { User } from './user.entity'

@Entity()
export class Membership {
    @PrimaryColumn({
        type: 'uuid',
    })
    id: string
    @ManyToOne(() => User)
    @JoinTable({
        name: 'userId',
    })
    user: User
    @Column({
        type: 'uuid',
    })
    userId: string
    @Column({
        type: 'enum',
        enum: UserTypes,
    })
    type: UserTypes
    @Column({
        type: 'varchar',
    })
    description: string
    @Column({
        type: 'timestamp',
    })
    initialDate: Date
    @Column({
        type: 'timestamp',
    })
    endDate: Date
}
