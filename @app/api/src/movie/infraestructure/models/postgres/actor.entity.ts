import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class Actor {
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
    lastName: string
}
