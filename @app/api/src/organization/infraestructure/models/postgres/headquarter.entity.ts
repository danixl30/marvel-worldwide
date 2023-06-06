import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class Headquarter {
    @PrimaryColumn({
        type: 'uuid',
    })
    id: string
    @Column({
        type: 'varchar',
    })
    edificationType: string
    @Column({
        type: 'varchar',
    })
    location: string
    @Column({
        type: 'varchar',
    })
    name: string
}
