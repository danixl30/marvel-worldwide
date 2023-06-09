import { Module } from '@nestjs/common'
import { Sha256Service } from './service/sha256.service'

export const CRYPTO_SHA256 = 'CRYPTO_SHA256'
@Module({
    providers: [Sha256Service],
    exports: [Sha256Service],
})
export class Sha256Module {}
