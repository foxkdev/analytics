import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { getClientIp } from '@supercharge/request-ip';

export const Ip = createParamDecorator(async (_, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  const ip = getClientIp(req);
  return ip !== '::1' ? ip : 'localhost';
});
