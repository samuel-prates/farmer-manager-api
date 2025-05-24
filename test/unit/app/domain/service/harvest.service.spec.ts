import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HarvestService } from 'src/app/domain/service/harvest.service';
import { Harvest } from 'src/infra/database/entities/harvest.entity';
import { Repository, DeleteResult } from 'typeorm';
import { CreateHarvestDto } from 'src/app/domain/dto/create-harvest.dto';
import { Farm } from 'src/infra/database/entities/farm.entity';

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

  it('should create a harvest with farm', async () => {
    const dto: CreateHarvestDto = { name: 'Harvest 1' } as any;
    const farm: Farm = { id: 1 } as Farm;
    const harvest = { ...dto, farm } as Harvest;

    harvestRepository.create.mockReturnValue(harvest);
    harvestRepository.save.mockResolvedValue(harvest);

    const result = await service.createHarvest(dto, farm);

    expect(harvestRepository.create).toHaveBeenCalledWith(dto);
    expect(harvestRepository.save).toHaveBeenCalledWith(harvest);
    expect(result).toEqual(harvest);
  });

  it('should create a harvest without farm', async () => {
    const dto: CreateHarvestDto = { name: 'Harvest 2' } as any;
    const harvest = { ...dto } as Harvest;

    harvestRepository.create.mockReturnValue(harvest);
    harvestRepository.save.mockResolvedValue(harvest);

    const result = await service.createHarvest(dto);

    expect(harvestRepository.create).toHaveBeenCalledWith(dto);
    expect(harvestRepository.save).toHaveBeenCalledWith(harvest);
    expect(result).toEqual(harvest);
  });

  it('should delete by farm id', async () => {
    const deleteResult = { affected: 1 } as DeleteResult;
    harvestRepository.delete.mockResolvedValue(deleteResult);

    const result = await service.deleteByFarmId(1);

    expect(harvestRepository.delete).toHaveBeenCalledWith({ farm: { id: 1 } });
    expect(result).toBe(deleteResult);
  });
});