import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class User {
    @PrimaryColumn({
        type: 'uuid',
    })
    id: string
    @Column({
        type: 'varchar',
        unique: true,
    })
    email: string
    @Column({
        type: 'varchar',
    })
    password: string
    @Column({
        type: 'date',
    })
    dob: Date
    @Column({
        type: 'int',
        length: 8,
    })
    cardNumber: number
}
