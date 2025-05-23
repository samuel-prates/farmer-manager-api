import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FarmService } from '../../../../../src/app/domain/service/farm.service';
import { Farm } from '../../../../../src/infra/database/entities/farm.entity';
import { Farmer } from '../../../../../src/infra/database/entities/farmer.entity';
import { HarvestService } from '../../../../../src/app/domain/service/harvest.service';
import { Repository } from 'typeorm';
import { CreateFarmDto } from '../../../../../src/app/domain/dto/create-farm.dto';

describe('FarmService', () => {
  let service: FarmService;
  let farmRepository: Repository<Farm>;
  let harvestService: HarvestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FarmService,
        {
          provide: getRepositoryToken(Farm),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findBy: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: HarvestService,
          useValue: {
            createHarvest: jest.fn(),
            deleteByFarmId: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<FarmService>(FarmService);
    farmRepository = module.get<Repository<Farm>>(getRepositoryToken(Farm));
    harvestService = module.get<HarvestService>(HarvestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a farm and its harvests', async () => {
    const createFarmDto: CreateFarmDto = {
      farmName: 'Test Farm',
      totalArea: 100,
      arableArea: 60,
      vegetationArea: 40,
      harvests: [{ name: 'Harvest 1' }],
    } as any;

    const farmer = { id: 1 } as Farmer;
    const farmEntity = { ...createFarmDto, farmer } as Farm;

    (farmRepository.create as jest.Mock).mockReturnValue(farmEntity);
    (farmRepository.save as jest.Mock).mockResolvedValue(farmEntity);

    await service.createFarm(createFarmDto, farmer);

    expect(farmRepository.create).toHaveBeenCalledWith(createFarmDto);
    expect(farmRepository.save).toHaveBeenCalledWith(farmEntity);
    expect(harvestService.createHarvest).toHaveBeenCalledWith(createFarmDto.harvests[0], farmEntity);
  });

  it('should delete farms and their harvests by farmerId', async () => {
    const farms = [{ id: 1 }, { id: 2 }] as Farm[];
    (farmRepository.findBy as jest.Mock).mockResolvedValue(farms);

    await service.deleteByFarmerId(1);

    expect(farmRepository.findBy).toHaveBeenCalledWith({ farmer: { id: 1 } });
    expect(harvestService.deleteByFarmId).toHaveBeenCalledTimes(2);
    expect(harvestService.deleteByFarmId).toHaveBeenCalledWith(1);
    expect(harvestService.deleteByFarmId).toHaveBeenCalledWith(2);
    expect(farmRepository.delete).toHaveBeenCalledWith({ farmer: { id: 1 } });
  });
});