import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Farm } from 'src/infra/database/entities/farm.entity';
import { FarmRepository } from 'src/infra/database/repositories/farm.repository';

@Injectable()
export class FarmService {
  constructor(
    @InjectRepository(Farm)
    private readonly farmRepository: FarmRepository,
  ) {}

  async deleteByFarmerId(farmerId: number): Promise<void> {
    await this.farmRepository.delete({ farmer: { id: farmerId } });
  }
}
