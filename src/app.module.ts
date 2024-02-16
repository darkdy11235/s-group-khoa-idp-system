import { Module } from '@nestjs/common';
import { SystemModule } from './system/system.module';
import { AppController } from './app.controller';
import { DatabaseService } from 'src/system/database/database.service';


@Module({
  imports: [SystemModule],
  controllers: [AppController],
  providers: [DatabaseService],
})
export class AppModule {}
