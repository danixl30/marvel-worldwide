import { PowerType } from 'src/heroe/domain/entities/power/value-objects/power.type'
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
        type: 'enum',
        enum: PowerType,
    })
    type: PowerType
}
