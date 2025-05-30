import { Repository } from 'typeorm';
import { Farm } from 'src/infra/database/entities/farm.entity';

export class FarmRepository extends Repository<Farm> {}
