import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { config } from '../config';
import { Connection } from 'mongoose';
import { extendedModelPlugin } from '../lib/db-utils/extended-model-plugin';
import { AdsModule } from '../ads/ads.module';

const { host, name, schema } = config.get('db');

@Module({
  imports: [
    MongooseModule.forRoot(`${schema}://${host}/${name}`, {
      connectionFactory: (connection: Connection) => {
        connection.plugin(extendedModelPlugin);
        return connection;
      },
    }),
    AuthModule,
    UsersModule,
    AdsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
