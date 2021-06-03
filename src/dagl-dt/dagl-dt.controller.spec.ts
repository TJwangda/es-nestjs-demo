import { Test, TestingModule } from '@nestjs/testing';
import { DaglDtController } from './dagl-dt.controller';
import { DaglDtService } from './dagl-dt.service';

describe('DaglDtController', () => {
  let controller: DaglDtController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DaglDtController],
      providers: [DaglDtService],
    }).compile();

    controller = module.get<DaglDtController>(DaglDtController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
