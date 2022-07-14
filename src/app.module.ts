import { Module } from '@nestjs/common';
import { MetricsModule } from './modules/metrics/metrics.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectsModule } from './modules/project/projects.module';
import { SearchModule } from './modules/search/search.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      load: [configuration],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database.uri'),
        dbName: configService.get<string>('database.name'),
      }),
      inject: [ConfigService],
    }),
    MetricsModule,
    ProjectsModule,
    SearchModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
