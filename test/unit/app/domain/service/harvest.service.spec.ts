import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HarvestService } from 'src/app/domain/service/harvest.service';
import { Harvest } from 'src/infra/database/entities/harvest.entity';
import { Repository, DeleteResult } from 'typeorm';

describe('HarvestService', () => {
  let service: HarvestService;
  let harvestRepository: jest.Mocked<Repository<Harvest>>;

  const mockHarvestRepository = {
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HarvestService,
        {
          provide: getRepositoryToken(Harvest),
          useValue: mockHarvestRepository,
        },
      ],
    }).compile();

    service = module.get<HarvestService>(HarvestService);
    harvestRepository = module.get(getRepositoryToken(Harvest));
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should delete by farm id', async () => {
    const deleteResult = { affected: 1 } as DeleteResult;
    harvestRepository.delete.mockResolvedValue(deleteResult);

    const result = await service.deleteByFarmId(1);

    expect(harvestRepository.delete).toHaveBeenCalledWith({ farm: { id: 1 } });
    expect(result).toBe(deleteResult);
  });
});