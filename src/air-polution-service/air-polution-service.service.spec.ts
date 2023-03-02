import { Test, TestingModule } from '@nestjs/testing';
import { AirPolutionServiceService } from './air-polution-service.service';

describe('AirPolutionServiceService', () => {
  let service: AirPolutionServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AirPolutionServiceService],
    }).compile();

    service = module.get<AirPolutionServiceService>(AirPolutionServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
