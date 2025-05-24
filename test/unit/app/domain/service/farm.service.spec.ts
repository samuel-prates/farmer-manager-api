import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FarmService } from 'src/app/domain/service/farm.service';
import { Farm } from 'src/infra/database/entities/farm.entity';
import { Repository } from 'typeorm';

describe('FarmService', () => {
  let service: FarmService;
  let farmRepository: jest.Mocked<Repository<Farm>>;

  const mockFarmRepository = {
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FarmService,
        { provide: getRepositoryToken(Farm), useValue: mockFarmRepository },
      ],
    }).compile();

    service = module.get<FarmService>(FarmService);
    farmRepository = module.get(getRepositoryToken(Farm));
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call deleteByFarmerId with correct farmerId', async () => {
    mockFarmRepository.delete.mockResolvedValue({} as any);

    await service.deleteByFarmerId(42);

    expect(farmRepository.delete).toHaveBeenCalledWith({ farmer: { id: 42 } });
  });
});