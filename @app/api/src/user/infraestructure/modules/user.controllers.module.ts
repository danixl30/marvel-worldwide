import { Module } from '@nestjs/common'
import { UUIDModule } from 'src/core/infraestructure/UUID/module/UUID.module'
import { initializeControllers } from 'src/core/infraestructure/controllers/controller-reader/controller.reader'
import { CryptoModule } from 'src/core/infraestructure/crypto/crypto.module'
import { PostgresRepositoriesModule } from 'src/core/infraestructure/repositories/postgres/postgres.repositories.module'
import { TokenModule } from 'src/core/infraestructure/token/token.module'

@Module({
    imports: [
        PostgresRepositoriesModule,
        TokenModule,
        CryptoModule,
        UUIDModule,
    ],
    controllers: initializeControllers(__dirname),
})
export class UserControllersModule {}
