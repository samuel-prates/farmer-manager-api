import { Test, TestingModule } from '@nestjs/testing';
import { FarmerController } from 'src/entrypoint/controller/farmer.controller';
import { FarmerService } from 'src/app/domain/service/farmer.service';
import { CreateFarmerDto } from 'src/app/domain/dto/create-farmer.dto';
import { UpdateFarmerDto } from 'src/app/domain/dto/update-farmer.dto';
import { PaginationDto } from 'src/app/domain/dto/pagination.dto';

describe('FarmerController', () => {
  let controller: FarmerController;
  let service: FarmerService;

  const mockFarmerService = {
    create: jest.fn(dto => ({ id: 1, ...dto })),
    findAll: jest.fn(() => [{ id: 1, farmerName: 'John', farms: [] }]),
    findOne: jest.fn(id => ({ id, farmerName: 'John', farms: [] })),
    update: jest.fn((id, dto) => ({ id, ...dto })),
    remove: jest.fn(id => ({ deleted: true, id })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FarmerController],
      providers: [
        { provide: FarmerService, useValue: mockFarmerService },
      ],
    }).compile();

    controller = module.get<FarmerController>(FarmerController);
    service = module.get<FarmerService>(FarmerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a farmer', () => {
    const dto: CreateFarmerDto = { federalIdentification: '12345678901', farmerName: 'John', farms: [] };
    expect(controller.create(dto)).toEqual({ id: 1, ...dto });
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should return all farmers', () => {
    const paginationDto = new PaginationDto();
    expect(controller.findAll(paginationDto)).toEqual([{ id: 1, farmerName: 'John', farms: [] }]);
    expect(service.findAll).toHaveBeenCalledWith(paginationDto);
  });

  it('should return one farmer', () => {
    expect(controller.findOne('1')).toEqual({ id: 1, farmerName: 'John', farms: [] });
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('should update a farmer', () => {
    const dto: UpdateFarmerDto = { farmerName: 'Jane', farms: [], federalIdentification: '12345678901' } as any;
    expect(controller.update('1', dto)).toEqual({ id: 1, ...dto });
    expect(service.update).toHaveBeenCalledWith(1, dto);
  });

  it('should remove a farmer', () => {
    expect(controller.remove('1')).toEqual({ deleted: true, id: 1 });
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
