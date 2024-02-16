  import 'dotenv/config';
  import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';

  export const dbConnectionConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT),
    database: process.env.DB_DATABASE,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: process.env.DB_SYNC ? process.env.DB_SYNC === 'true' : false,
    migrationsRun: process.env.DB_MIGRATION_RUN
      ? process.env.DB_MIGRATION_RUN === 'true'
      : true,
  };