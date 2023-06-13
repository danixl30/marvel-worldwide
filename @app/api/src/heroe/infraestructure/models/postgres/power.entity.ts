import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'
import { Own } from './own.entity'

@Entity()
export class Power {
    @PrimaryColumn({
        type: 'uuid',
    })
    id: string
    @Column({
        type: 'varchar',
    })
    name: string
    @Column({
        type: 'varchar',
    })
    description: string
    @Column({
        type: 'varchar',
        enum: ['artificial', 'natural', 'inherited'],
    })
    type: string
    @OneToMany(() => Own, (own) => own.idPower)
    own: Own[]
}
