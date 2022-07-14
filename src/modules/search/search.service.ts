import { Injectable } from '@nestjs/common';
import { MetricsRepository } from '../metrics/metrics.repository';

@Injectable()
export class SearchService {
  constructor(private metricsRepository: MetricsRepository) {}

  async getPageViews(projectId: string) {
    return this.metricsRepository.getPages(projectId);
  }

  async getTotals(projectId: string) {
    const pageViews = await this.metricsRepository.getTotals(
      projectId,
      'page_view',
    );
    const users = await this.metricsRepository.getTotalUsers(projectId);
    return {
      pageViews,
      users,
    };
  }
}
