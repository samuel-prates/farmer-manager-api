import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Farm } from 'src/infra/database/entities/farm.entity';
import { Harvest } from 'src/infra/database/entities/harvest.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { FarmRepository } from 'src/infra/database/repositories/farm.repository';
import { HarvestRepository } from 'src/infra/database/repositories/harvest.repository';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Farm)
    private readonly farmRepository: FarmRepository,
    @InjectRepository(Harvest)
    private readonly harvestRepository: HarvestRepository,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  async getFarmStates() {
    const cacheKey = 'dashboard_farm_states';
    const cachedData = await this.cacheManager.get(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    const farms = await this.farmRepository.find();
    const stateCounts = farms.reduce((acc, farm) => {
      acc[farm.state] = (acc[farm.state] || 0) + 1;
      return acc;
    }, {});

    await this.cacheManager.set(cacheKey, stateCounts);
    return stateCounts;
  }

  async getHarvestCultures() {
    const cacheKey = 'dashboard_harvest_cultures';
    const cachedData = await this.cacheManager.get(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    const harvests = await this.harvestRepository.find();
    const cultureCounts = harvests.reduce((acc, harvest) => {
      acc[harvest.culture] = (acc[harvest.culture] || 0) + 1;
      return acc;
    }, {});

    await this.cacheManager.set(cacheKey, cultureCounts);
    return cultureCounts;
  }

  async getAreas() {
    const cacheKey = 'dashboard_areas';
    const cachedData = await this.cacheManager.get(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    const farms = await this.farmRepository.find();
    const totalArableArea = farms.reduce((sum, farm) => sum + farm.arableArea, 0);
    const totalVegetationArea = farms.reduce((sum, farm) => sum + farm.vegetationArea, 0);
    const result = { totalArableArea, totalVegetationArea };

    await this.cacheManager.set(cacheKey, result);
    return result;
  }
}
