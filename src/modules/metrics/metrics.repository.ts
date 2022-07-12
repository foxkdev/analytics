import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Metric, MetricDocument } from './schemas/metric.schema';

@Injectable()
export class MetricsRepository {
  constructor(
    @InjectModel(Metric.name) private metricModel: Model<MetricDocument>,
  ) {}

  async create(metric) {
    const newMetric = new this.metricModel(metric);
    return newMetric.save();
  }
}
