import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MetricsModule } from '../metrics/metrics.module';
import { MetricsRepository } from '../metrics/metrics.repository';
import { Metric, MetricSchema } from '../metrics/schemas/metric.schema';
import { ProjectsModule } from '../project/projects.module';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Metric.name, schema: MetricSchema }]),
    MetricsModule,
    ProjectsModule,
  ],
  controllers: [SearchController],
  providers: [SearchService, MetricsRepository],
})
export class SearchModule {}
