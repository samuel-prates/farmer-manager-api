import { Test, TestingModule } from '@nestjs/testing';
import { DashboardController } from 'src/entrypoint/controller/dashboard.controller';
import { DashboardService } from 'src/app/domain/service/dashboard.service';

describe('DashboardController', () => {
  let controller: DashboardController;

  const mockDashboardService = {
    getFarmStates: jest.fn().mockResolvedValue({ SP: 2, MG: 1 }),
    getHarvestCultures: jest.fn().mockResolvedValue({ Corn: 2, Soy: 1 }),
    getAreas: jest.fn().mockResolvedValue({ totalArableArea: 450, totalVegetationArea: 225 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DashboardController],
      providers: [
        { provide: DashboardService, useValue: mockDashboardService },
      ],
    }).compile();

    controller = module.get<DashboardController>(DashboardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return farm states count', async () => {
    expect(await controller.getFarmStates()).toEqual({ SP: 2, MG: 1 });
    expect(mockDashboardService.getFarmStates).toHaveBeenCalled();
  });

  it('should return harvest cultures count', async () => {
    expect(await controller.getHarvestCultures()).toEqual({ Corn: 2, Soy: 1 });
    expect(mockDashboardService.getHarvestCultures).toHaveBeenCalled();
  });

  it('should return total areas', async () => {
    expect(await controller.getAreas()).toEqual({ totalArableArea: 450, totalVegetationArea: 225 });
    expect(mockDashboardService.getAreas).toHaveBeenCalled();
  });
});
