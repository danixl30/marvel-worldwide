import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

@Global()
@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: (process.env.DATABASE_TYPE as any) || 'postgres',
            host: process.env.DATABASE_HOST || '::1',
            port: Number(process.env.DATABASE_PORT || 3306),
            username: process.env.DATABASE_USERNAME || 'postgres',
            password: process.env.DATABASE_PASSWORD || 'root',
            database: process.env.DATABASE_DATABASE_NAME || 'marvelDB',
            autoLoadEntities: true,
            synchronize: true,
        }),
    ],
})
export class PostgresConnectionModule {}
