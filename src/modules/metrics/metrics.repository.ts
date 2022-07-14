import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Metric, MetricDocument } from './schemas/metric.schema';

@Injectable()
export class MetricsRepository {
  constructor(
    @InjectModel(Metric.name) private metricModel: Model<MetricDocument>,
  ) {}

  async findAll(filters): Promise<MetricDocument[]> {
    return this.metricModel.find(filters).exec();
  }

  async create(metric) {
    const newMetric = new this.metricModel(metric);
    return newMetric.save();
  }

  private async aggregate(aggregate): Promise<MetricDocument[]> {
    return this.metricModel.aggregate(aggregate).exec();
  }

  async getPages(projectId: string) {
    return this.aggregate([
      {
        $match: {
          projectId: projectId,
          metricType: 'page_view',
        },
      },
      {
        $group: {
          _id: '$host.path',
          total: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          total: -1,
        },
      },
      {
        $project: {
          _id: 0,
          path: '$_id',
          total: 1,
        },
      },
    ]);
  }

  async getTotals(projectId: string, metricType: string) {
    const totals = await this.aggregate([
      {
        $match: {
          projectId,
          metricType,
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: 1,
          },
        },
      },
      {
        $project: {
          _id: 0,
          total: 1,
        },
      },
    ]);
    return totals[0]['total'];
  }

  async getTotalUsers(projectId: string) {
    const totals = await this.aggregate([
      {
        $match: {
          projectId,
          metricType: 'page_view',
        },
      },
      {
        $group: {
          _id: '$user.anonymousId',
          total: {
            $sum: 1,
          },
        },
      },
      {
        $count: 'total',
      },
    ]);
    return totals[0]['total'];
  }
}
