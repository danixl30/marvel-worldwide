import { User } from 'src/user/infraestructure/models/postgres/user.entity'
import { Column, Entity, JoinTable, ManyToOne, PrimaryColumn } from 'typeorm'

@Entity()
export class Profile {
    @PrimaryColumn({
        type: 'uuid',
    })
    id: string
    @Column({
        type: 'uuid',
    })
    @ManyToOne((_t) => User)
    @JoinTable({
        name: 'id',
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
