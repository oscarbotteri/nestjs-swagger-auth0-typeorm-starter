import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { ExecutionContext } from '@nestjs/common';
import { userFactory } from './logged-user.decorator';

describe('LoggedUser', () => {
  let executionContext: DeepMocked<ExecutionContext>;
  const user = {
    firstName: 'test',
    lastName: 'test',
    email: 'test@test.com',
  };

  beforeEach(() => {
    executionContext = createMock<ExecutionContext>();
    executionContext.switchToHttp().getRequest.mockReturnValue({
      user,
    });
  });

  beforeEach(() => jest.clearAllMocks());

  it('should return user data', () => {
    const data = userFactory(undefined, executionContext);
    expect(data).toStrictEqual(user);
  });

  it('should return a specific user field', () => {
    const data = userFactory('firstName', executionContext);
    expect(data).toBe(user.firstName);
  });

  it('should return undefined if the requested user field does not exist', () => {
    const data = userFactory('invalid', executionContext);
    expect(data).toBeUndefined();
  });
});
