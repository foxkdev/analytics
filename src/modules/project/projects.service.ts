import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { ProjectsRepository } from './projects.repository';

@Injectable()
export class ProjectsService {
  constructor(private projectsRepository: ProjectsRepository) {}

  async getByToken(token) {
    const project = await this.projectsRepository.findByToken(token);
    return project ? project.toJSON() : null;
  }

  async getAll() {
    const projects = await this.projectsRepository.findAll();
    return projects.map((project) => project.toJSON());
  }

  async getById(projectId) {
    const project = await this.projectsRepository.findById(projectId);
    return project ? project.toJSON() : null;
  }

  async regenerateToken(projectId) {
    const data = {
      tokens: [{ token: uuidv4() }],
      updatedAt: new Date(),
    };
    const project = await this.projectsRepository.update(projectId, data);
    return project.toJSON();
  }

  async createProject(content) {
    const project = await this.projectsRepository.create({
      _id: uuidv4(),
      name: content.name,
      tokens: [{ token: uuidv4() }],
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return project.toJSON();
  }
}
