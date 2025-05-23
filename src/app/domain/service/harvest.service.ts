import { Harvest } from "../../../infra/database/entities/harvest.entity";
import { CreateHarvestDto } from "../dto/create-harvest.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { Farm } from "../../../infra/database/entities/farm.entity";

export class HarvestService {
    constructor(
        @InjectRepository(Harvest)
        private readonly harvestRepository: Repository<Harvest>,
    ) { }

    // Example method to create a new harvest
    async createHarvest(harvestDto: CreateHarvestDto, farm?: Farm): Promise<Harvest | null> {
        const harvest: Harvest = this.harvestRepository.create(harvestDto);
        if (farm) {
            harvest.farm = farm;
        }
        await this.harvestRepository.save(harvest);
        return harvest;
    }

    deleteByFarmId(farmId: number): Promise<DeleteResult> {
        return this.harvestRepository.delete({ farm: { id: farmId } });
    }
}