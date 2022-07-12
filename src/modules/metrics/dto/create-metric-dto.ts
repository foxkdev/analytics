import { IsEnum, IsObject, IsString, Validate } from 'class-validator';
import { ContentValidator } from '../validators/content.validator';

export const MetricTypes = ['page_view', 'event', 'click', 'purchase'];
export class CreateMetricDto {
  @IsString()
  @IsEnum(MetricTypes)
  type: string;

  @IsString()
  name: string;

  @Validate(ContentValidator)
  content: object;

  @IsObject()
  user: {
    uuid: string;
    ip: string;
    anonymousId: string;
  };

  @IsObject()
  host: {
    hostname: string;
    browser: string;
    device: string;
  };
}
