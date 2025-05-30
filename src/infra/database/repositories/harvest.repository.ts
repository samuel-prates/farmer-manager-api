import { Repository } from 'typeorm';
import { Harvest } from 'src/infra/database/entities/harvest.entity';

export class HarvestRepository extends Repository<Harvest> {}
