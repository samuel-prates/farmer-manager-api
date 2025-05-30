import { Harvest } from 'src/infra/database/entities/harvest.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';
import { HarvestRepository } from 'src/infra/database/repositories/harvest.repository';

export class HarvestService {
  constructor(
    @InjectRepository(Harvest)
    private readonly harvestRepository: HarvestRepository,
  ) {}

  deleteByFarmId(farmId: number): Promise<DeleteResult> {
    return this.harvestRepository.delete({ farm: { id: farmId } });
  }
}
