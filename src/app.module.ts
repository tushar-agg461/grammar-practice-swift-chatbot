import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MessageService } from './services/message/message.service';
import { LocalizationService } from './services/localization/localization.service';
import { User } from './database/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IntentClassifierService } from './services/intent-classifier/intent-classifier.service';

import * as dotenv from 'dotenv';
import { UserService } from './database/query';
dotenv.config();


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DATA_BASE,
      entities: [User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AppController],
  providers: [ MessageService, LocalizationService, IntentClassifierService,UserService],
})
export class AppModule {}
