import { Test, TestingModule } from '@nestjs/testing';
import { DashboardController } from 'src/entrypoint/controller/dashboard.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Farm } from 'src/infra/database/entities/farm.entity';
import { Harvest } from 'src/infra/database/entities/harvest.entity';

describe('DashboardController', () => {
  let controller: DashboardController;

  const mockFarmRepository = {
    find: jest.fn(() => [
      { state: 'SP', arableArea: 100, vegetationArea: 50 },
      { state: 'SP', arableArea: 200, vegetationArea: 100 },
      { state: 'MG', arableArea: 150, vegetationArea: 75 },
    ]),
  };

  const mockHarvestRepository = {
    find: jest.fn(() => [
      { culture: 'Corn' },
      { culture: 'Soy' },
      { culture: 'Corn' },
    ]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DashboardController],
      providers: [
        { provide: getRepositoryToken(Farm), useValue: mockFarmRepository },
        { provide: getRepositoryToken(Harvest), useValue: mockHarvestRepository },
      ],
    }).compile();

    controller = module.get<DashboardController>(DashboardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return farm states count', async () => {
    expect(await controller.getFarmStates()).toEqual({ SP: 2, MG: 1 });
  });

  it('should return harvest cultures count', async () => {
    expect(await controller.getHarvestCultures()).toEqual({ Corn: 2, Soy: 1 });
  });

  it('should return total areas', async () => {
    expect(await controller.getAreas()).toEqual({ totalArableArea: 450, totalVegetationArea: 225 });
  });
});