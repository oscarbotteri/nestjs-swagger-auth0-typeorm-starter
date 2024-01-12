import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';

describe('HealthController', () => {
  let module: TestingModule;
  let healthController: HealthController;
  let healthService: DeepMocked<HealthService>;

  beforeEach(async () => {
    jest.clearAllMocks();

    module = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        {
          provide: HealthService,
          useFactory: () => createMock(HealthService),
        },
      ],
    }).compile();

    healthController = module.get(HealthController);
    healthService = module.get(HealthService);
  });

  it('should be defined', () => {
    expect(healthController).toBeDefined();
  });

  describe('getStatus', () => {
    it('should return a message comming from the service', async () => {
      healthService.getMessage.mockReturnValue('test');

      const response = await healthController.getStatus();

      expect(response).toBe('test');
    });
  });
});
