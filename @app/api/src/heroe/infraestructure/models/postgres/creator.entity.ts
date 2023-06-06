import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class Creator {
    @PrimaryColumn({
        type: 'uuid',
    })
    id: string
    @Column({
        type: 'varchar',
    })
    firstName: string
    @Column({
        type: 'varchar',
    })
    lastName: string
    @Column({
        type: 'uuid',
    })
    idPerson: string
}
