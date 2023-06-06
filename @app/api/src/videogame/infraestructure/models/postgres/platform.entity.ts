import { Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class Platform {
    @PrimaryColumn({
        type: 'uuid',
    })
    idVideogame: string
    @PrimaryColumn({
        type: 'varchar',
    })
    name: string
}
