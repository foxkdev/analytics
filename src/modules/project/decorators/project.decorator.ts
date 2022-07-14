import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Project = createParamDecorator(
  async (_, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();

    return req.headers['x-token'];
  },
);
