import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Farm } from '../../../infra/database/entities/farm.entity';
import { Farmer } from '../../../infra/database/entities/farmer.entity';
import { HarvestService } from './harvest.service';
import { CreateFarmDto } from '../dto/create-farm.dto';

@Injectable()
export class FarmService {
    constructor(
        @InjectRepository(Farm)
        private readonly farmRepository: Repository<Farm>,
        @Inject(HarvestService)
        private readonly harvestService: HarvestService,
    ) { }

    async createFarm(createFarmDto: CreateFarmDto, farmer?: Farmer): Promise<Farm> {
        const farm = this.farmRepository.create(createFarmDto);
        if (farmer) {
            farm.farmer = farmer;
        }
        await this.farmRepository.save(farm);
        for (const harvestDto of createFarmDto.harvests) {
            await this.harvestService.createHarvest(harvestDto, farm);
        }
        return farm;
    }

    async deleteByFarmerId(farmerId: number): Promise<void> {
        const farms = await this.farmRepository.findBy({ farmer: { id: farmerId } });
        for (const farm of farms) {
            await this.harvestService.deleteByFarmId(farm.id);
        }
        await this.farmRepository.delete({ farmer: { id: farmerId } });
    }

}