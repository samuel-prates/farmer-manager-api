import { Harvest } from "src/infra/database/entities/harvest.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";

export class HarvestService {
    constructor(
        @InjectRepository(Harvest)
        private readonly harvestRepository: Repository<Harvest>,
    ) { }

    deleteByFarmId(farmId: number): Promise<DeleteResult> {
        return this.harvestRepository.delete({ farm: { id: farmId } });
    }
}