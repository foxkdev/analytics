import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MetricDocument = Metric & Document;

@Schema()
export class Metric {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  metricType: string;

  @Prop()
  name: string;

  @Prop({ required: true, type: Object })
  content: object;

  @Prop({ required: true, type: Object })
  user: object;

  @Prop({ required: true, type: Object })
  host: object;

  @Prop({ required: true, type: Object })
  properties: object;

  @Prop({ required: true, ref: 'Project' })
  projectId: string;

  @Prop({ required: true })
  createdAt: Date;
}

export const MetricSchema = SchemaFactory.createForClass(Metric);
