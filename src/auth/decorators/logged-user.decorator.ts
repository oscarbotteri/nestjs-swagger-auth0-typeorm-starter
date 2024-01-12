import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Factory function to create a custom decorator which returns the current user data
 *
 * This function it is exported to be able to create unit test for LoggedUser decorator
 * @see https://github.com/nestjs/nest/issues/1020#issuecomment-417646366
 * @param data - Specific user field to return
 * @param ctx - Interface describing details about the current request pipeline
 */
export const userFactory = (
  data: string | undefined,
  ctx: ExecutionContext,
) => {
  const { user } = ctx.switchToHttp().getRequest();

  return data ? user[data] : user;
};

export const LoggedUser = createParamDecorator(userFactory);
