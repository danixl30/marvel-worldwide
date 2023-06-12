import { Column, Entity, PrimaryColumn } from 'typeorm'

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
}
