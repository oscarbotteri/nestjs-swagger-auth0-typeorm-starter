import { TestBed } from '@automock/jest';
import { HealthService } from './health.service';

describe('HealthService', () => {
  let healthService: HealthService;

  beforeEach(async () => {
    const { unit } = TestBed.create(HealthService).compile();

    healthService = unit;
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
