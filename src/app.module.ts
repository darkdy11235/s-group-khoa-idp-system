import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/modules/auth.module';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [UserModule, AuthModule, TypeOrmModule.forRoot(typeOrmConfig)],  
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
