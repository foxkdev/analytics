import { Inject, Injectable } from '@nestjs/common';
import {
  ClientProxy,
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@Injectable()
export class MetricsService {
  constructor(@Inject('EVENTS_SERVICE') private client: ClientProxy) {}

  async saveMetric(body) {
    return this.client.emit('save-metric', body);
  }
}
