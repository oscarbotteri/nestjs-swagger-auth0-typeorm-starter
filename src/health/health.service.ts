import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  public getMessage(): string {
    return 'ok';
  }
}
