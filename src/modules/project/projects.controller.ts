import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project-dto';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  async getAllProjects() {
    return this.projectsService.getAll();
  }

  @Get(':projectId')
  async getProject(@Param('projectId') projectId: string) {
    return this.projectsService.getById(projectId);
  }

  @Post(':projectId/regenerate-token')
  async regenerateToken(@Param('projectId') projectId: string) {
    return this.projectsService.regenerateToken(projectId);
  }

  @Post()
  async createProject(@Body() project: CreateProjectDto) {
    return this.projectsService.createProject(project);
  }
}
