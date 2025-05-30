import { Repository } from 'typeorm';
import { Farmer } from 'src/infra/database/entities/farmer.entity';

export class FarmerRepository extends Repository<Farmer> {}
