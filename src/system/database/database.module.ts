import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConnectionConfig } from './config/db-connection.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
        useFactory: () => dbConnectionConfig,
        }),
    ],
})
export class DatabaseModule {}