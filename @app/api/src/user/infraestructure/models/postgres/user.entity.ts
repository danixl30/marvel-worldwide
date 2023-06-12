import { Check, Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
@Check('"email" ~* \'^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$\'')
@Check('"cardNumber" ~* \'^\\d{16}$\'')
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
        type: 'varchar',
    })
    cardNumber: string
}
