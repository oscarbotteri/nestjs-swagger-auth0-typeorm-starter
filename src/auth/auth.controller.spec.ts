import { TestBed } from '@automock/jest';
import { AuthController } from './auth.controller';

describe('AuthController', () => {
  let authController: AuthController;

  beforeEach(async () => {
    const { unit } = TestBed.create(AuthController).compile();

    authController = unit;
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('getStatus', () => {
    it('should return a message comming from the service', async () => {
      const user = {
        firstName: 'test',
        lastName: 'test',
        email: 'test@test.com',
      };

      const response = await authController.getCurrentUser(user);

      expect(response).toStrictEqual(user);
    });
  });
});
