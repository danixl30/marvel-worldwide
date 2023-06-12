import { User } from 'src/user/infraestructure/models/postgres/user.entity'
import {
    Check,
    Column,
    Entity,
    JoinTable,
    ManyToOne,
    PrimaryColumn,
} from 'typeorm'

@Entity()
@Check('"email" ~* \'^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$\'')
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
        nullable: true,
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
