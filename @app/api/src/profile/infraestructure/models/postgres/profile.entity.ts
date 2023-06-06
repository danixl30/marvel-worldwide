import { User } from 'src/user/infraestructure/models/postgres/user.entity'
import { Column, Entity, JoinTable, ManyToOne, PrimaryColumn } from 'typeorm'

@Entity()
export class Profile {
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
        type: 'varchar',
    })
    language: string
    @Column({
        type: 'varchar',
    })
    email: string
}
