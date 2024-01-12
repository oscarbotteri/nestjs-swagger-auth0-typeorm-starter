import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';

describe('AuthController', () => {
  let module: TestingModule;
  let authController: AuthController;

  beforeEach(async () => {
    jest.clearAllMocks();

    module = await Test.createTestingModule({
      controllers: [AuthController],
    }).compile();

    authController = module.get(AuthController);
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
