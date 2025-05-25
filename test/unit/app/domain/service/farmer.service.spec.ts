import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FarmerService } from 'src/app/domain/service/farmer.service';
import { FarmService } from 'src/app/domain/service/farm.service';
import { Farmer } from 'src/infra/database/entities/farmer.entity';
import { Repository } from 'typeorm';
import { ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateFarmerDto } from 'src/app/domain/dto/create-farmer.dto';
import { UpdateFarmerDto } from 'src/app/domain/dto/update-farmer.dto';

describe('FarmerService', () => {
  let service: FarmerService;
  let farmerRepository: jest.Mocked<Repository<Farmer>>;
  let farmService: FarmService;

  const mockFarmerRepository = {
    findOneBy: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    merge: jest.fn(),
    delete: jest.fn(),
  };

  const mockFarmService = {
    deleteByFarmerId: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FarmerService,
        { provide: getRepositoryToken(Farmer), useValue: mockFarmerRepository },
        { provide: FarmService, useValue: mockFarmService },
      ],
    }).compile();

    service = module.get<FarmerService>(FarmerService);
    farmerRepository = module.get(getRepositoryToken(Farmer));
    farmService = module.get<FarmService>(FarmService);

    jest.clearAllMocks();
  });

  it('should create a farmer', async () => {
    mockFarmerRepository.findOneBy.mockResolvedValue(null);
    mockFarmerRepository.create.mockReturnValue({ id: 1, farms: [] });
    mockFarmerRepository.save.mockResolvedValue({ id: 1, farms: [] });

    const dto: CreateFarmerDto = { federalIdentification: '12345678901', farmerName: 'John', farms: [] };
    const result = await service.create(dto);

    expect(mockFarmerRepository.findOneBy).toHaveBeenCalledWith({ federalIdentification: dto.federalIdentification });
    expect(mockFarmerRepository.create).toHaveBeenCalledWith(dto);
    expect(mockFarmerRepository.save).toHaveBeenCalled();
    expect(result).toEqual({ id: 1, farms: [] });
  });

  it('should throw ConflictException if farmer exists', async () => {
    mockFarmerRepository.findOneBy.mockResolvedValue({ id: 1 });

    const dto: CreateFarmerDto = { federalIdentification: '12345678901', farmerName: 'John', farms: [] };
    await expect(service.create(dto)).rejects.toThrow(ConflictException);
  });

  it('should throw BadRequestException on other errors', async () => {
    mockFarmerRepository.findOneBy.mockRejectedValue(new Error('DB error'));

    const dto: CreateFarmerDto = { federalIdentification: '12345678901', farmerName: 'John', farms: [] };
    await expect(service.create(dto)).rejects.toThrow(BadRequestException);
  });

  it('should find all farmers', async () => {
    mockFarmerRepository.find.mockResolvedValue([{ id: 1 }]);
    const result = await service.findAll();
    expect(result).toEqual([{ id: 1 }]);
    expect(mockFarmerRepository.find).toHaveBeenCalledWith({
      relations: {
        farms: {
          "harvests": true,
        },
      },
    });
  });

  it('should find one farmer', async () => {
    mockFarmerRepository.findOne.mockResolvedValue({ id: 1 });
    const result = await service.findOne(1);
    expect(result).toEqual({ id: 1 });
    expect(mockFarmerRepository.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
      relations: { farms: { harvests: true } },
    });
  });

  it('should throw NotFoundException if farmer not found (findOne)', async () => {
    mockFarmerRepository.findOne.mockResolvedValue(null);
    await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
  });

  it('should update a farmer', async () => {
    mockFarmerRepository.findOneBy.mockResolvedValue({ id: 1, farms: [] });
    mockFarmService.deleteByFarmerId.mockResolvedValue(undefined);
    mockFarmerRepository.merge.mockReturnValue({ id: 1, farms: [] });
    mockFarmerRepository.save.mockResolvedValue({ id: 1, farms: [] });

    const dto: UpdateFarmerDto = { federalIdentification: '12345678901', farmerName: 'Jane', farms: [] };
    const result = await service.update(1, dto);

    expect(mockFarmerRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    expect(mockFarmService.deleteByFarmerId).toHaveBeenCalledWith(1);
    expect(mockFarmerRepository.merge).toHaveBeenCalled();
    expect(mockFarmerRepository.save).toHaveBeenCalled();
    expect(result).toEqual({ id: 1, farms: [] });
  });

  it('should throw NotFoundException if farmer not found (update)', async () => {
    mockFarmerRepository.findOneBy.mockResolvedValue(null);
    const dto: UpdateFarmerDto = { federalIdentification: '12345678901', farmerName: 'Jane', farms: [] };
    await expect(service.update(1, dto)).rejects.toThrow(NotFoundException);
  });

  it('should remove a farmer', async () => {
    mockFarmerRepository.findOneBy.mockResolvedValue({ id: 1 });
    mockFarmerRepository.delete.mockResolvedValue(undefined);

    await service.remove(1);

    expect(mockFarmerRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    expect(mockFarmerRepository.delete).toHaveBeenCalledWith(1);
  });

  it('should throw NotFoundException if farmer not found (remove)', async () => {
    mockFarmerRepository.findOneBy.mockResolvedValue(null);
    await expect(service.remove(1)).rejects.toThrow(NotFoundException);
  });
});