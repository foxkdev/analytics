import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectsModule } from '../project/projects.module';
import { MetricsController } from './metrics.controller';
import { MetricsRepository } from './metrics.repository';
import { MetricsService } from './metrics.service';
import { Metric, MetricSchema } from './schemas/metric.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Metric.name, schema: MetricSchema }]),
    ProjectsModule,
  ],
  controllers: [MetricsController],
  providers: [
    MetricsService,
    MetricsRepository,
    {
      provide: 'EVENTS_SERVICE',
      useFactory: (configService: ConfigService) => {
        const uri = configService.get('rabbitmq.uri');
        const queue = configService.get('rabbitmq.queue');

        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [uri],
            queue,
            queueOptions: {
              durable: false,
            },
          },
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [MetricsService],
})
export class MetricsModule {}
