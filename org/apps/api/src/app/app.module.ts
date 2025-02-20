import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { config } from '../config';
import { Connection } from 'mongoose';
import { extendedModelPlugin } from '../lib/db-utils/extended-model-plugin';
import { JobOffersModule } from '../job-offers/job-offers.module';
import { ServiceOffersModule } from '../service-offers/service-offers.module';
import { ApplicationsModule } from '../applications/applications.module';
import { ApplicationResponsesModule } from '../application-reponses/application-responses.module';
import { PersonalRatingsModule } from '../personal-ratings/personal-ratings.module';
import { PublicRatingsModule } from '../public-ratings/public-ratings.module';
import { NotificationsModule } from '../notifications/notifications.module';

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
    ServiceOffersModule,
    JobOffersModule,
    ApplicationsModule,
    ApplicationResponsesModule,
    PersonalRatingsModule,
    PublicRatingsModule,
    NotificationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
