import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class Combat {
    @PrimaryColumn({
        type: 'uuid',
    })
    id: string
    @Column({
        type: 'varchar',
    })
    place: string
    @Column({
        type: 'date',
    })
    date: Date
}
