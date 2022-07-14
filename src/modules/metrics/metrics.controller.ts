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
import { Ip } from '../decorators/ip.decorator';
import { Project } from '../project/decorators/project.decorator';
import { ProjectsService } from '../project/projects.service';
import { CreateMetricDto } from './dto/create-metric-dto';
import { MetricsService } from './metrics.service';

@Controller('metrics')
export class MetricsController {
  constructor(
    private readonly metricsService: MetricsService,
    private readonly projectsService: ProjectsService,
  ) {}

  @Post()
  async createMetric(
    @Body() metric: CreateMetricDto,
    @Project() projectToken: string,
    @Ip() ip: string,
  ) {
    const project = await this.projectsService.getByToken(projectToken);
    if (!project) {
      throw new UnauthorizedException();
    }
    metric.user.ip = ip;
    return this.metricsService.addMetric({ ...metric, projectId: project._id });
  }

  @EventPattern('add-metric')
  async onMetric(@Payload() payload) {
    return this.metricsService.saveMetric(payload);
  }
}
