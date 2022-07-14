import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from './schemas/project.schema';

@Injectable()
export class ProjectsRepository {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
  ) {}

  async findAll() {
    return this.projectModel.find();
  }

  async findById(projectId) {
    return this.projectModel.findById(projectId);
  }

  async findByToken(token) {
    return this.projectModel.findOne({ 'tokens.token': token });
  }
  async create(project) {
    const newProject = new this.projectModel(project);
    return newProject.save();
  }

  async update(projectId, data) {
    const project = await this.findById(projectId);
    project.set(data);
    return project.save();
  }
}
