import { Test, TestingModule } from '@nestjs/testing';
import { HealthService } from './health.service';

describe('HealthService', () => {
  let module: TestingModule;
  let healthService: HealthService;

  beforeEach(async () => {
    jest.clearAllMocks();

    module = await Test.createTestingModule({
      providers: [HealthService],
    }).compile();

    healthService = module.get(HealthService);
  });

  it('should be defined', () => {
    expect(healthService).toBeDefined();
  });

  describe('getMessage', () => {
    it('should return "ok"', () => {
      const response = healthService.getMessage();

      expect(response).toBe('ok');
    });
  });
});
