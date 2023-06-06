import { Module } from '@nestjs/common'
import { PostgresConnectionModule } from './postgre/postgre.connection.module'

@Module({
    imports: [PostgresConnectionModule],
    exports: [PostgresConnectionModule],
})
export class DatabaseConnectionModule {}
