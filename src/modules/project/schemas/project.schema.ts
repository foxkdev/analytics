import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema()
export class Project {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  tokens: object[];

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  updatedAt: Date;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
