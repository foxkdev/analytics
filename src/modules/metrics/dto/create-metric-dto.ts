import { IsObject, IsString } from 'class-validator';

export class CreateMetricDto {
  @IsString()
  name: string;

  @IsObject()
  content: object;

  @IsObject()
  user: {
    id: string;
    ip: string;
  };
}
