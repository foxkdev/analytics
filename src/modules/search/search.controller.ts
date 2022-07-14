import {
  Body,
  Controller,
  Headers,
  Get,
  UnauthorizedException,
} from '@nestjs/common';
import { MetricsService } from '../metrics/metrics.service';
import { Project } from '../project/decorators/project.decorator';
import { ProjectsService } from '../project/projects.service';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(
    private readonly searchService: SearchService,
    private readonly projectsService: ProjectsService,
  ) {}

  @Get('pages')
  async getPages(@Project() projectToken: string) {
    const projectId = await this.checkProject(projectToken);
    return this.searchService.getPageViews(projectId);
  }

  @Get('totals')
  async getTotals(@Project() projectToken: string) {
    const projectId = await this.checkProject(projectToken);
    return this.searchService.getTotals(projectId);
  }

  private async checkProject(token) {
    const project = await this.projectsService.getByToken(token);
    if (!project) {
      throw new UnauthorizedException();
    }
    return project._id;
  }
}
