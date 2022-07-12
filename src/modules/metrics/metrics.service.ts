import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { ClientProxy } from '@nestjs/microservices';
import { MetricsRepository } from './metrics.repository';

@Injectable()
export class MetricsService {
  constructor(
    @Inject('EVENTS_SERVICE') private client: ClientProxy,
    private metricsRepository: MetricsRepository,
  ) {}

  async addMetric(body) {
    return this.client.emit('add-metric', body);
  }

  async saveMetric(metric) {
    return this.metricsRepository.create({
      _id: uuidv4(),
      metricType: metric.type,
      name: metric.name,
      content: metric.content,
      user: metric.user,
      host: metric.host || {},
      projectId: metric.projectId,
      createdAt: new Date(),
    });
  }
}
