import {
  Body,
  Controller,
  Headers,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
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
  async createMetric(
    @Body() metric: CreateMetricDto,
    @Headers('x-token') projectId: string,
  ) {
    if (!projectId) {
      throw new UnauthorizedException('project not valid');
    }
    return this.metricsService.addMetric({ ...metric, projectId });
  }

  @EventPattern('add-metric')
  async onMetric(@Payload() payload) {
    return this.metricsService.saveMetric(payload);
  }
}
