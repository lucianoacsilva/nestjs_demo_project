import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from "@nestjs/mongoose";
import { databaseUrl, password, userName } from './env';
@Module({
  imports: [
    MongooseModule.forRoot(`mongodb+srv://${userName}:${password}@${databaseUrl}`),
    TasksModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
