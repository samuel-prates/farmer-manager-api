import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Farm } from 'src/infra/database/entities/farm.entity';

@Injectable()
export class FarmService {
    constructor(
        @InjectRepository(Farm)
        private readonly farmRepository: Repository<Farm>
    ) { }

    async deleteByFarmerId(farmerId: number): Promise<void> {
        await this.farmRepository.delete({ farmer: { id: farmerId } });
    }

}