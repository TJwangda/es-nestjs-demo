import { Test, TestingModule } from '@nestjs/testing';
import { DaglDtService } from './dagl-dt.service';

describe('DaglDtService', () => {
  let service: DaglDtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DaglDtService],
    }).compile();

    service = module.get<DaglDtService>(DaglDtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
