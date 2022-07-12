import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { MetricsController } from './metrics.controller';
import { MetricsService } from './metrics.service';

@Module({
  imports: [],
  controllers: [MetricsController],
  providers: [
    MetricsService,
    {
      provide: 'EVENTS_SERVICE',
      useFactory: () => {
        // const user = configService.get('RABBITMQ_USER');
        // const password = configService.get('RABBITMQ_PASSWORD');
        // const host = configService.get('RABBITMQ_HOST');
        // const queueName = configService.get('RABBITMQ_QUEUE_NAME');

        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://admin:admin@localhost:5672`],
            queue: 'metrics',
            queueOptions: {
              durable: false,
            },
          },
        });
      },
      inject: [],
    },
  ],
})
export class MetricsModule {}
