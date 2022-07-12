import { Body, Controller, Post } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { CreateMetricDto } from './dto/create-metric-dto';
import { MetricsService } from './metrics.service';

@Controller('metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Post()
  async createMetric(@Body() metric: CreateMetricDto) {
    return this.metricsService.saveMetric(metric);
  }

  @EventPattern('save-metric')
  async onMetric(@Payload() payload) {
    console.log('EVENT', payload);
  }
}
