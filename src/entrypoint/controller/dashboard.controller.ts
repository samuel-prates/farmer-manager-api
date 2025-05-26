import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Farm } from '../../infra/database/entities/farm.entity';
import { Harvest } from '../../infra/database/entities/harvest.entity';

@Controller('dashboard')
export class DashboardController {
  constructor(
    @InjectRepository(Farm)
    private readonly farmRepository: Repository<Farm>,
    @InjectRepository(Harvest)
    private readonly harvestRepository: Repository<Harvest>,
  ) {}

  @Get('farm-states')
  async getFarmStates() {
    const farms = await this.farmRepository.find();
    const stateCounts = farms.reduce((acc, farm) => {
      acc[farm.state] = (acc[farm.state] || 0) + 1;
      return acc;
    }, {});
    return stateCounts;
  }

  @Get('harvest-cultures')
  async getHarvestCultures() {
    const harvests = await this.harvestRepository.find();
    const cultureCounts = harvests.reduce((acc, harvest) => {
      acc[harvest.culture] = (acc[harvest.culture] || 0) + 1;
      return acc;
    }, {});
    return cultureCounts;
  }

  @Get('areas')
  async getAreas() {
    const farms = await this.farmRepository.find();
    const totalArableArea = farms.reduce((sum, farm) => sum + farm.arableArea, 0);
    const totalVegetationArea = farms.reduce((sum, farm) => sum + farm.vegetationArea, 0);
    return { totalArableArea, totalVegetationArea };
  }
}