import { TestBed } from '@automock/jest';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';

describe('HealthController', () => {
  let healthController: HealthController;
  let healthService: jest.Mocked<HealthService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(HealthController).compile();

    healthController = unit;
    healthService = unitRef.get(HealthService);
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
